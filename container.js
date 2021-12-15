import { Container } from "inversify";
import {BooksRepository} from "./interface/IBook";

const myContainer = new Container();
myContainer.bind(BooksRepository).toSelf();

export { myContainer };