const uidGenerator = require('node-unique-id-generator');

class Book {
    constructor(title = "", desc = "", id = uidGenerator.generateUniqueId(), authors = "", favorite = "", fileCover = "", fileName = "", fileBook = "") {
        this.id = id;
        this.title = title;
        this.desc = desc;
        this.authors = authors;
        this.favorite = favorite;
        this.fileCover = fileCover;
        this.fileName = fileName;
        this.fileBook = fileBook
    }
}

module.exports = Book;