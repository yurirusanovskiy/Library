const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 1,
        maxlength: 50
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author"
    }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;


