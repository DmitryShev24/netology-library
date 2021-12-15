var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// @ts-ignore
const express = require("express");
// const cors = require("cors")
// const bodyParser = require("body-parser")
const mongoose = require('mongoose');
const errorMiddleware = require('./middleware/error');
const indexRouter = require('./routes/api');
const bookApiRouter = require('./routes/api/books');
// const booksRouter = require('./routes/books')
const app = express();
// app.set('view engine', 'ejs')
//
// app.use(cors())
// app.use(bodyParser())
app.use('/public', express.static(__dirname + "/public"));
app.use('/', indexRouter);
// app.use('/books', booksRouter)
app.use('/api/books', bookApiRouter);
app.use(errorMiddleware);
const PORT = process.env.PORT || 3000;
const UserDB = process.env.DB_USERNAME || 'root';
const PasswordDB = process.env.DB_PASSWORD || 'qwerty12345';
const NameDB = process.env.DB_NAME || 'books';
const HostDb = process.env.DB_HOST || 'mongodb://localhost:27017/';
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //const UrlDB = `mongodb+srv://${UserDB}:${PasswordDB}@cluster0.grfrs.mongodb.net/${NameDB}`;
            //const UrlDB = `mongodb://localhost:27017/mydb`;
            //const UrlDB = `mongodb://${UserDB}:${PasswordDB}@localhost:27017/mydb`;
            //await mongoose.connect(UrlDb);
            yield mongoose.connect(HostDb, {
                user: UserDB,
                pass: PasswordDB,
                dbName: NameDB,
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            app.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}`);
            });
        }
        catch (e) {
            console.log(e);
        }
    });
}
start();
module.exports = (req, res) => {
    res.status(404);
    const content = '404 | not found';
    res.send(content);
};
const multer = require("multer");
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "public/bookfile");
    },
    filename(req, file, cb) {
        cb(null, `${new Date().toISOString().replace(/:/g, '-')}-${file.originalname}`);
    }
});
const allowedTypes = ['application/pdf', 'application/doc', 'application/epub'];
const fileFilter = (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
module.exports = multer({
    storage, fileFilter
});
const { Schema, model } = require('mongoose');
const bookSchema = new Schema({
    id: {
        type: String,
        default: "",
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "",
    },
    authors: {
        type: String,
        default: "",
    },
    favorite: {
        type: String,
        default: "",
    },
    fileCover: {
        type: String,
        default: "",
    },
    fileName: {
        type: String,
        default: "",
    },
});
module.exports = model('Book', bookSchema);
// const Book = require("./book")
//
// module.exports = {
//     Book,
// }
// const express = require("express")
// const router = express.Router()
// const {Book} = require("../models")
//
// const stor = {
//     book: [],
// }
//
// let data = [1, 2, 3]
//
// data.map(el => {
//     const newBook = new Book(`book ${el}`, `desc book ${el}`);
//     stor.book.push(newBook);
// });
//
// router.get('/', (req, res) => {
//     const {book} = stor
//     const {title, desc} = req.body
//
//     res.render("books/index", {
//         title: "Книги",
//         books: book
//     })
// });
//
// router.get('/create', (req, res) => {
//         res.render('books/create', {
//             title: 'Создание книги',
//             book: {}
//         })
//     }
// )
//
// router.post('/create', (req, res) => {
//     const {book} = stor
//     const {title, desc} = req.body
//
//     const newBook = new Book(title, desc)
//     book.push(newBook);
//
//     res.status(201)
//     res.redirect('/books')
// })
//
// router.get('/:id', (req, res) => {
//     const {book} = stor
//     const {id} = req.params
//     const idx = book.findIndex(el => el.id === id);
//
//     res.render("books/view", {
//         title: "Книга | просмотр",
//         book: book[idx]
//     })
// });
//
// router.get('/update/:id', (req, res) => {
//     const {book} = stor
//     const {id} = req.params
//     const idx = book.findIndex(el => el.id === id);
//
//     res.render("books/update", {
//         title: "Книга | редактирование",
//         book: book[idx]
//     })
// });
//
// router.post('/update/:id', (req, res) => {
//     const {book} = stor
//     const {id} = req.params
//     const {title, desc} = req.body
//     const idx = book.findIndex(el => el.id === id);
//
//     if (idx !== -1) {
//         book[idx] = {
//             ...book[idx],
//             title,
//             desc
//         }
//         res.redirect(`/books/${id}`)
//     } else {
//         res.status(404).redirect('/404')
//     }
// });
//
// router.post('/delete/:id', (req, res) => {
//     const {book} = stor
//     const {id} = req.params
//     const idx = book.findIndex(el => el.id === id);
//
//     if (idx !== -1) {
//         book.splice(idx, 1)
//         res.redirect(`/books`)
//     } else {
//         res.status(404).redirect('/404')
//     }
//
// })
//
// module.exports = router
const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
    res.send('<h1>Index<h1>');
});
module.exports = router;
// @see https://github.com/passport/express-4.x-local-example
const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('./db');
const { users } = require("./db");
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
const app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.get('/', function (req, res) {
    res.render('home', { user: req.user });
});
app.get('/user/login', function (req, res) {
    res.render('login');
});
app.get('/user/signup', function (req, res) {
    res.render('signup');
});
app.post('/user/login', passport.authenticate('local', {
    failureRedirect: '/user/login',
}), function (req, res) {
    console.log("req.user: ", req.user);
    res.redirect('/user/me');
});
app.post('/user/signup', function (req, res) {
    users.signupUser(req.body.username, req.body.password, req.body.displayName, req.body.email);
    console.log("req.user: ", req.user);
    //res.redirect('/user/me')
});
app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});
app.get('/user/me', function (req, res, next) {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
        if (req.session) {
            req.session.returnTo = req.originalUrl || req.url;
        }
        return res.redirect('/user/login');
    }
    next();
}, function (req, res) {
    res.render('profile', { user: req.user });
});
// start app
app.listen(process.env.NODE_PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.NODE_PORT}`);
});
