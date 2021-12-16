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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
//const express = require("express")
const express_1 = __importDefault(require("express"));
// const cors = require("cors")
// const bodyParser = require("body-parser")
//const mongoose = require('mongoose');
const mongoose_1 = __importDefault(require("mongoose"));
const errorMiddleware = require('./middleware/error');
const indexRouter = require('./web/routes/api');
const bookApiRouter = require('./web/routes/api/books');
// const booksRouter = require('./routes/books')
const app = express_1.default();
// app.set('view engine', 'ejs')
//
// app.use(cors())
// app.use(bodyParser())
app.use('/public', express_1.default.static(__dirname + "/public"));
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
            yield mongoose_1.default.connect(HostDb, {
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
