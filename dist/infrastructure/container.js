"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myContainer = void 0;
const inversify_1 = require("inversify");
const books_service_1 = require("../books/books.service");
const myContainer = new inversify_1.Container();
exports.myContainer = myContainer;
myContainer.bind(books_service_1.BooksRepository).toSelf();
