const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")

const errorMiddleware = require('./middleware/error')

const indexRouter = require('./routes/api')
const bookApiRouter = require('./routes/api/books')
const booksRouter = require('./routes/books')

const app = express();

app.set('view engine', 'ejs')

app.use(cors())
app.use(bodyParser())

app.use('/public', express.static(__dirname+"/public"))


app.use('/', indexRouter)
app.use('/books', booksRouter)
app.use('/api/books', bookApiRouter)

app.use(errorMiddleware)


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`=== start server PORT ${PORT} ===`);
});