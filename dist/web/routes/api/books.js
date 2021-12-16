"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const books_service_1 = require("../../../books/books.service");
const express = require("express");
const router = express.Router();
const fileMiddleware = require('../../../middleware/file');
const myContainer = require('../../../infrastructure/container');
const Book = require("../../../books/models/book");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../passport/db");
const app = express();
const repo = myContainer.get(books_service_1.BooksRepository);
/**
 * @param {String} username
 * @param {String} password
 * @param {Function} done
 */
function verify(username, password, done) {
    db.users.findByUsername(username, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false);
        }
        if (!db.users.verifyPassword(user, password)) {
            return done(null, false);
        }
        // `user` будет сохранен в `req.user`
        return done(null, user);
    });
}
const options = {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: false,
};
//  Добавление стратегии для использования
passport.use('local', new LocalStrategy(options, verify));
// Конфигурирование Passport для сохранения пользователя в сессии
passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});
passport.deserializeUser(function (id, cb) {
    db.users.findById(id, function (err, user) {
        if (err) {
            return cb(err);
        }
        cb(null, user);
    });
});
router.get("/user/login", (req, res) => {
    res.render('home', { user: req.user });
});
router.get("/user/me", (req, res, next) => {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
        if (req.session) {
            req.session.returnTo = req.originalUrl || req.url;
        }
        return res.redirect('/login');
    }
    next();
});
// app.get('/profile',
//     function (req, res, next) {
//
//     },
//     function (req, res) {
//         res.render('profile', { user: req.user })
//     })
router.post("/user/login", (req, res) => {
    passport.authenticate('local', {
        failureRedirect: '/user/login',
    });
    console.log("req.user: ", req.user);
    res.redirect('/');
    //})
});
router.post("/user/signup");
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield repo.getBooks();
    //Book.find().select('-__v');
    res.json(books);
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const book = yield repo.getBook(id);
        //Book.findById(id).select('-__v');
        res.json(book);
    }
    catch (e) {
        console.error(e);
        res.status(404).json("book | not found");
    }
}));
// router.get("/:id/download", (req, res) => {
//     res.download(__dirname+"/../public/book/2021-29-08-file.pdf", "file.pdf", err => {
//         if (err){
//             res.status(404).json()
//         }
//     })
// })
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //const {title, desc} = req.body
    //const newBook = new Book({title, desc})
    const newBook = new Book({
        title: 'title...',
        desc: 'desc...',
    });
    try {
        yield repo.createBook(newBook);
        //newBook.save();
        res.status(201);
        res.json(newBook);
    }
    catch (e) {
        console.error(e);
        res.status(500).json();
    }
}));
// router.post('/upload-book', fileMiddleware.single('book'), (req, res) => {
//     if (req.file) {
//         const {path} = req.file
//         console.log(path)
//
//         res.json(path)
//     } else {
//         res.json(null)
//     }
// })
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, desc } = req.body;
    const { id } = req.params;
    try {
        yield repo.updateBook(id, title, desc);
        //Book.findByIdAndUpdate(id, {title, desc});
        res.redirect(`/api/books/${id}`);
    }
    catch (e) {
        console.error(e);
        res.status(500).json();
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield repo.deleteBook(id);
        //Book.deleteOne({_id: id});
        res.json(true);
    }
    catch (e) {
        console.error(e);
        res.status(500).json();
    }
}));
// router.get('/:id/download-book', (req, res) => {
//     res.download(__dirname+'/../public/bookfile/2021-08-31T14-23-37.743Z-testfile.pdf', 'book.pdf', err=>{
//         if (err){
//             res.status(404).json();
//         }
//     });
// });
app.use(passport.initialize());
app.use(passport.session());
module.exports = router;
