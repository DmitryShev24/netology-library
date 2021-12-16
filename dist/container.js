"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myContainer = void 0;
const inversify_1 = require("inversify");
//import {BooksRepository} from "./src/interface/IBook";
const myContainer = new inversify_1.Container();
exports.myContainer = myContainer;
myContainer.bind(BooksRepository).toSelf();
