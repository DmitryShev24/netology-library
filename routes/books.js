const express = require("express")
const router = express.Router()
const {Book} = require("../models")
const fileMiddleware = require('../middleware/file')

const stor = {
    book: [],
}

let data = [1, 2, 3]

data.map(el => {
    const newBook = new Book(`book ${el}`, `desc book ${el}`);
    stor.book.push(newBook);
});


// router.post('/api/user/login', (req, res) => {
//     res.status(201)
//     res.json({
//         id: 1, mail: "test@mail.ru"
//     })
// });

router.get("/", (req, res) => {
    console.log('test')
    const {book} = stor
    res.json(book)
});


router.get('/:id', (req, res) => {
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

router.get("/:id/download", (req, res) => {
    res.download(__dirname+"/../public/book/2021-29-08-file.pdf", "file.pdf", err => {
        if (err){
            res.status(404).json()
        }
    })
})

router.post('/', (req, res) => {
    const {book} = stor
    const {title, desc} = req.body

    const newBook = new Book(title, desc)
    book.push(newBook);

    res.status(201)
    res.json(newBook)
});

router.post('/upload-book', fileMiddleware.single('book'), (req, res) => {
    if (req.file) {
        const {path} = req.file
        console.log(path)

        res.json(path)
    } else {
        res.json(null)
    }
})

router.put('/:id', (req, res) => {
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
        res.json("book | not found");
    }
});

router.delete('/:id', (req, res) => {
    const {book} = stor;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);

    if (idx !== -1) {
        book.splice(idx, 1);
        res.json(true);
    } else {
        res.status(404);
        res.json("book | not found");
    }
});

router.get('/:id/download-book', (req, res) => {
    res.download(__dirname+'/../public/bookfile/2021-08-31T14-23-37.743Z-testfile.pdf', 'book.pdf', err=>{
        if (err){
            res.status(404).json();
        }
    });
});

module.exports = router