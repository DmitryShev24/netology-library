const express = require("express")

const indexRouter = require('./routes/index');
const bookRouter = require('./routes/book');

const app = express();

app.use('/public', express.static(__dirname+"/public"))

app.use('/', indexRouter);
app.use('/api/books', bookRouter);

app.listen(3000);
