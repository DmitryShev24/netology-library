heroku — https://shevchenko-ejs.herokuapp.com/books

MongoDB

task1
db.books.insertMany([
    {book1},
    {book2},
])

task2
db.books.find({title: "title"})

task3
db.inventory.updateOne({ _id: id }, { $set: { description: "description", authors: authors }, } )