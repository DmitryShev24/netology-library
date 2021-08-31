const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")

const errorMiddleware = require('./middleware/error')

const indexRouter = require('./routes/index')
const bookRouter = require('./routes/books')

const app = express();

app.use(cors())
app.use(bodyParser())

app.use('/public', express.static(__dirname+"/public"))

//app.use('/', indexRouter);
app.use('/api/books', bookRouter)

app.use(errorMiddleware)

app.listen(3000)