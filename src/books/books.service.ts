import {IBook} from "./book"

export class BooksRepository {
    books: Array<IBook>

    constructor() {
        this.books = []
    }

    createBook(book:IBook){
        this.books.push(book)
    }
    getBook(id: number){
        return this.books.filter((book) => book.id == id)
    }
    getBooks(){
        return this.books
    }
    updateBook(id: number, title: string, desc: string){
        return this.books.map(obj => {
            if (obj.id === id) {
                return {...obj, title, desc};
            }
            return obj;
        });
    }
    deleteBook(id: number){
        this.books = this.books.filter((book) => book.id !== id)
    }
}