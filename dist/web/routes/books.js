"use strict";
// const express = require("express")
// const router = express.Router()
// const {Book} = require("../models")
//
// const stor = {
//     book: [],
// }
//
// let data = [1, 2, 3]
//
// data.map(el => {
//     const newBook = new Book(`book ${el}`, `desc book ${el}`);
//     stor.book.push(newBook);
// });
//
// router.get('/', (req, res) => {
//     const {book} = stor
//     const {title, desc} = req.body
//
//     res.render("books/index", {
//         title: "Книги",
//         books: book
//     })
// });
//
// router.get('/create', (req, res) => {
//         res.render('books/create', {
//             title: 'Создание книги',
//             book: {}
//         })
//     }
// )
//
// router.post('/create', (req, res) => {
//     const {book} = stor
//     const {title, desc} = req.body
//
//     const newBook = new Book(title, desc)
//     book.push(newBook);
//
//     res.status(201)
//     res.redirect('/books')
// })
//
// router.get('/:id', (req, res) => {
//     const {book} = stor
//     const {id} = req.params
//     const idx = book.findIndex(el => el.id === id);
//
//     res.render("books/view", {
//         title: "Книга | просмотр",
//         book: book[idx]
//     })
// });
//
// router.get('/update/:id', (req, res) => {
//     const {book} = stor
//     const {id} = req.params
//     const idx = book.findIndex(el => el.id === id);
//
//     res.render("books/update", {
//         title: "Книга | редактирование",
//         book: book[idx]
//     })
// });
//
// router.post('/update/:id', (req, res) => {
//     const {book} = stor
//     const {id} = req.params
//     const {title, desc} = req.body
//     const idx = book.findIndex(el => el.id === id);
//
//     if (idx !== -1) {
//         book[idx] = {
//             ...book[idx],
//             title,
//             desc
//         }
//         res.redirect(`/books/${id}`)
//     } else {
//         res.status(404).redirect('/404')
//     }
// });
//
// router.post('/delete/:id', (req, res) => {
//     const {book} = stor
//     const {id} = req.params
//     const idx = book.findIndex(el => el.id === id);
//
//     if (idx !== -1) {
//         book.splice(idx, 1)
//         res.redirect(`/books`)
//     } else {
//         res.status(404).redirect('/404')
//     }
//
// })
//
// module.exports = router
