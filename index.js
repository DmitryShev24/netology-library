const express = require("express")


const {Book} = require("./Book")

const stor = {
    book: [],
}
[1,2,3].map(el => {
    const newBook = new Book(`book ${el}`, `desc book ${el}`)
    stor.book.push(newBook)
})
const app = express();

app.post('/api/user/login', (req, res) => {
    res.status(201)
    res.json({
        id: 1, mail: "test@mail.ru"
    })
});

app.get("/api/books", (req, res) => {
    const {book} = stor
    res.json(book)
});


app.get('/api/books/:id', (req, res) => {
    const {book} = stor
    const {id} = req.params
    const idx = book.findIndex(el => el.id === id)

    if (idx !== -1 ) {
        res.json(book[idx])
    } else {
        res.status(404)
        res.json("book | not found")
    }
});

app.post('/api/books/:id', (req, res) => {
    const {book} = stor;
    const {title, desc} = req.body;

    const newTodo = new Book(title, desc);
    book.push(newTodo);

    res.status(201);
    res.json(newTodo);
});

app.put('/api/books/:id', (req, res) => {
    const {book} = stor;
    const {title, desc} = req.body;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);

    if (idx !== -1) {
        book[idx] = {
            ...book[idx],
            title,
            desc,
        };
        res.json(book[idx]);
    } else {
        res.status(404);
        res.json("todo | not found");
    }
});

app.delete('/api/books/:id', (req, res) => {
    const {book} = stor;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);

    if (idx !== -1) {
        book.splice(idx, 1);
        res.json(true);
    } else {
        res.status(404);
        res.json("todo | not found");
    }
});

app.listen(3000);
