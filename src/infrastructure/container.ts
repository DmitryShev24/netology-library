import { Container } from "inversify";
import {BooksRepository} from "../books/books.service";

const myContainer = new Container();
myContainer.bind(BooksRepository).toSelf();

export { myContainer };