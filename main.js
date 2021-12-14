"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var BooksRepository = (function () {
    function BooksRepository() {
        this.books = [];
    }
    BooksRepository.prototype.createBook = function (book) {
        this.books.push(book);
    };
    BooksRepository.prototype.getBook = function (id) {
        return this.books.filter(function (book) { return book.id == id; });
    };
    BooksRepository.prototype.getBooks = function () {
        return this.books;
    };
    BooksRepository.prototype.updateBook = function (id, title) {
        return this.books.map(function (obj) {
            if (obj.id === id) {
                return __assign(__assign({}, obj), { title: title });
            }
            return obj;
        });
    };
    BooksRepository.prototype.deleteBook = function (id) {
        this.books = this.books.filter(function (book) { return book.id !== id; });
    };
    return BooksRepository;
}());
var express = require("express");
var mongoose = require('mongoose');
var errorMiddleware = require('./middleware/error');
var indexRouter = require('./routes/api');
var bookApiRouter = require('./routes/api/books');
var app = express();
app.use('/public', express.static(__dirname + "/public"));
app.use('/', indexRouter);
app.use('/api/books', bookApiRouter);
app.use(errorMiddleware);
var PORT = process.env.PORT || 3000;
var UserDB = process.env.DB_USERNAME || 'root';
var PasswordDB = process.env.DB_PASSWORD || 'qwerty12345';
var NameDB = process.env.DB_NAME || 'books';
var HostDb = process.env.DB_HOST || 'mongodb://localhost:27017/';
function start() {
    return __awaiter(this, void 0, void 0, function () {
        var e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4, mongoose.connect(HostDb, {
                            user: UserDB,
                            pass: PasswordDB,
                            dbName: NameDB,
                            useNewUrlParser: true,
                            useUnifiedTopology: true
                        })];
                case 1:
                    _a.sent();
                    app.listen(PORT, function () {
                        console.log("Server is running on port " + PORT);
                    });
                    return [3, 3];
                case 2:
                    e_1 = _a.sent();
                    console.log(e_1);
                    return [3, 3];
                case 3: return [2];
            }
        });
    });
}
start();
module.exports = function (req, res) {
    res.status(404);
    var content = '404 | not found';
    res.send(content);
};
var multer = require("multer");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/bookfile");
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + "-" + file.originalname);
    }
});
var allowedTypes = ['application/pdf', 'application/doc', 'application/epub'];
var fileFilter = function (req, file, cb) {
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
module.exports = multer({
    storage: storage, fileFilter: fileFilter
});
var _a = require('mongoose'), Schema = _a.Schema, model = _a.model;
var bookSchema = new Schema({
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
var express = require("express");
var router = express.Router();
var fileMiddleware = require('../../middleware/file');
var Book = require("../../models/book");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var db = require("../passport/db");
var app = express();
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
        return done(null, user);
    });
}
var options = {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: false,
};
passport.use('local', new LocalStrategy(options, verify));
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
router.get("/user/login", function (req, res) {
    res.render('home', { user: req.user });
});
router.get("/user/me", function (req, res, next) {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
        if (req.session) {
            req.session.returnTo = req.originalUrl || req.url;
        }
        return res.redirect('/login');
    }
    next();
});
router.post("/user/login", function (req, res) {
    passport.authenticate('local', {
        failureRedirect: '/user/login',
    });
    console.log("req.user: ", req.user);
    res.redirect('/');
});
router.post("/user/signup");
router.get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var book;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, Book.find().select('-__v')];
            case 1:
                book = _a.sent();
                res.json(book);
                return [2];
        }
    });
}); });
router.get('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, book, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4, Book.findById(id).select('-__v')];
            case 2:
                book = _a.sent();
                res.json(book);
                return [3, 4];
            case 3:
                e_2 = _a.sent();
                console.error(e_2);
                res.status(404).json("book | not found");
                return [3, 4];
            case 4: return [2];
        }
    });
}); });
router.post('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newBook, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                newBook = new Book({
                    title: 'title...',
                    desc: 'desc...',
                });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4, newBook.save()];
            case 2:
                _a.sent();
                res.status(201);
                res.json(newBook);
                return [3, 4];
            case 3:
                e_3 = _a.sent();
                console.error(e_3);
                res.status(500).json();
                return [3, 4];
            case 4: return [2];
        }
    });
}); });
router.put('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, desc, id, e_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, title = _a.title, desc = _a.desc;
                id = req.params.id;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4, Book.findByIdAndUpdate(id, { title: title, desc: desc })];
            case 2:
                _b.sent();
                res.redirect("/api/books/" + id);
                return [3, 4];
            case 3:
                e_4 = _b.sent();
                console.error(e_4);
                res.status(500).json();
                return [3, 4];
            case 4: return [2];
        }
    });
}); });
router.delete('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4, Book.deleteOne({ _id: id })];
            case 2:
                _a.sent();
                res.json(true);
                return [3, 4];
            case 3:
                e_5 = _a.sent();
                console.error(e_5);
                res.status(500).json();
                return [3, 4];
            case 4: return [2];
        }
    });
}); });
app.use(passport.initialize());
app.use(passport.session());
module.exports = router;
var express = require('express');
var router = express.Router();
router.get('/', function (req, res) {
    res.send('<h1>Index<h1>');
});
module.exports = router;
var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('./db');
var users = require("./db").users;
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
        return done(null, user);
    });
}
var options = {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: false,
};
passport.use('local', new LocalStrategy(options, verify));
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
var app = express();
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
app.listen(process.env.NODE_PORT, function () {
    console.log("Example app listening at http://localhost:" + process.env.NODE_PORT);
});
//# sourceMappingURL=main.js.map