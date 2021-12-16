import {BooksRepository} from "../../../books/books.service"

const express = require("express")
const router = express.Router()
const fileMiddleware = require('../../../middleware/file')
const myContainer = require('../../../infrastructure/container')
const Book = require("../../../books/models/book")


const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy


const db = require("../passport/db")
const app = express()
const repo = myContainer.get(BooksRepository)


/**
 * @param {String} username
 * @param {String} password
 * @param {Function} done
 */
function verify (username: any, password: any, done: any) {
    db.users.findByUsername(username, function (err: any, user: any) {
        if (err) { return done(err) }
        if (!user) { return done(null, false) }

        if (!db.users.verifyPassword(user, password)) { return done(null, false) }

        // `user` будет сохранен в `req.user`
        return done(null, user)
    })
}

const options = {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: false,
}


//  Добавление стратегии для использования
passport.use('local', new LocalStrategy(options, verify))

// Конфигурирование Passport для сохранения пользователя в сессии
passport.serializeUser(function (user: any, cb: any) {
    cb(null, user.id)
})

passport.deserializeUser(function (id: any, cb: any) {
    db.users.findById(id, function (err: any, user: any) {
        if (err) { return cb(err) }
        cb(null, user)
    })
})


router.get("/user/login", (req: any, res:any) => {
    res.render('home', {user: req.user})
})

router.get("/user/me", (req: any, res: any, next: any) => {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
        if (req.session) {
            req.session.returnTo = req.originalUrl || req.url
        }
        return res.redirect('/login')
    }
    next()
})
// app.get('/profile',
//     function (req, res, next) {
//
//     },
//     function (req, res) {
//         res.render('profile', { user: req.user })
//     })

router.post("/user/login", (req: any, res: any) => {
    passport.authenticate(
        'local',
        {
            failureRedirect: '/user/login',
        },
    )

            console.log("req.user: ", req.user)
            res.redirect('/')
        //})
})


router.post("/user/signup")





router.get("/", async (req: any, res: any) => {

    const books = await repo.getBooks()
        //Book.find().select('-__v');
    res.json(books);
});


router.get('/:id', async (req: any, res: any) => {
    const {id} = req.params;
    try {
        const book = await repo.getBook(id);
            //Book.findById(id).select('-__v');
        res.json(book);
    } catch (e) {
        console.error(e);
        res.status(404).json("book | not found");
    }

});

// router.get("/:id/download", (req, res) => {
//     res.download(__dirname+"/../public/book/2021-29-08-file.pdf", "file.pdf", err => {
//         if (err){
//             res.status(404).json()
//         }
//     })
// })

router.post('/', async (req: any, res: any) => {
    //const {title, desc} = req.body

    //const newBook = new Book({title, desc})

    const newBook = new Book({
        title: 'title...',
        desc: 'desc...',
    });

    try {
        await repo.createBook(newBook)

            //newBook.save();
        res.status(201)
        res.json(newBook);
    } catch (e) {
        console.error(e);
        res.status(500).json();
    }
});

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

router.put('/:id', async (req: any, res: any) => {
    const {title, desc} = req.body;
    const {id} = req.params;

    try {
        await repo.updateBook(id, title, desc)
            //Book.findByIdAndUpdate(id, {title, desc});
        res.redirect(`/api/books/${id}`);
    } catch (e) {
        console.error(e);
        res.status(500).json();
    }

});

router.delete('/:id', async (req: any, res: any) => {
    const {id} = req.params;
    try {
        await repo.deleteBook(id)

            //Book.deleteOne({_id: id});
        res.json(true);
    } catch (e) {
        console.error(e);
        res.status(500).json();
    }

});

// router.get('/:id/download-book', (req, res) => {
//     res.download(__dirname+'/../public/bookfile/2021-08-31T14-23-37.743Z-testfile.pdf', 'book.pdf', err=>{
//         if (err){
//             res.status(404).json();
//         }
//     });
// });

app.use(passport.initialize())
app.use(passport.session())


module.exports = router







