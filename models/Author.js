const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 1,
        maxlength: 50
    },
    books: [ // list of books
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book"
        }
    ]
});

const Author = mongoose.model("Author", authorSchema);

module.exports = Author;

