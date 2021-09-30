const express = require("express")
const router = express.Router()
const fileMiddleware = require('../../middleware/file')

const Book = require("../../models/book")


router.get("/", async (req, res) => {
    const book = await Book.find().select('-__v');
    res.json(book);
});


router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const book = await Book.findById(id).select('-__v');
        res.json(book);
    } catch (e) {
        console.error(e);
        res.status(404).json("book | not found");
    }

});

// router.get("/:id/download", (req, res) => {
//     res.download(__dirname+"/../public/book/2021-29-08-file.pdf", "file.pdf", err => {
//         if (err){
//             res.status(404).json()
//         }
//     })
// })

router.post('/', async (req, res) => {
    //const {title, desc} = req.body

    //const newBook = new Book({title, desc})

    const newBook = new Book({
        title: 'title...',
        desc: 'desc...',
    });

    try {
        await newBook.save();
        res.status(201)
        res.json(newBook);
    } catch (e) {
        console.error(e);
        res.status(500).json();
    }
});

// router.post('/upload-book', fileMiddleware.single('book'), (req, res) => {
//     if (req.file) {
//         const {path} = req.file
//         console.log(path)
//
//         res.json(path)
//     } else {
//         res.json(null)
//     }
// })

router.put('/:id', async (req, res) => {
    const {title, desc} = req.body;
    const {id} = req.params;

    try {
        await Book.findByIdAndUpdate(id, {title, desc});
        res.redirect(`/api/books/${id}`);
    } catch (e) {
        console.error(e);
        res.status(500).json();
    }

});

router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        await Book.deleteOne({_id: id});
        res.json(true);
    } catch (e) {
        console.error(e);
        res.status(500).json();
    }

});

// router.get('/:id/download-book', (req, res) => {
//     res.download(__dirname+'/../public/bookfile/2021-08-31T14-23-37.743Z-testfile.pdf', 'book.pdf', err=>{
//         if (err){
//             res.status(404).json();
//         }
//     });
// });

module.exports = router