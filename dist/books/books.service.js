"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksRepository = void 0;
class BooksRepository {
    constructor() {
        this.books = [];
    }
    createBook(book) {
        this.books.push(book);
    }
    getBook(id) {
        return this.books.filter((book) => book.id == id);
    }
    getBooks() {
        return this.books;
    }
    updateBook(id, title, desc) {
        return this.books.map(obj => {
            if (obj.id === id) {
                return Object.assign(Object.assign({}, obj), { title, desc });
            }
            return obj;
        });
    }
    deleteBook(id) {
        this.books = this.books.filter((book) => book.id !== id);
    }
}
exports.BooksRepository = BooksRepository;
