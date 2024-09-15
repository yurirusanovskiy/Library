const express = require('express');
const bookRouter = express.Router();
const Book = require('../models/Book');
const Author = require('../models/Author');

// Get all books
bookRouter.get('/', async (req, res) => {
    try {
        const books = await Book.find().populate('author');
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a book by ID
bookRouter.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate('author');
        if (!book) return res.status(404).json({ message: "Book not found" });
        res.json(book);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new book
bookRouter.post('/', async (req, res) => {
    try {
        const { title, authorName } = req.body;
        
        // Find or create the author
        let author = await Author.findOne({ name: authorName });
        if (!author) {
            author = new Author({ name: authorName });
            await author.save();
        }

        const newBook = new Book({ title, author: author._id });
        const savedBook = await newBook.save();

        // Update author's books list
        await Author.findByIdAndUpdate(author._id, { $push: { books: savedBook._id } });

        res.status(201).json(savedBook);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update a book
bookRouter.put('/:id', async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBook) return res.status(404).json({ message: "Book not found" });
        res.json(updatedBook);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a book
bookRouter.delete('/:id', async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) return res.status(404).json({ message: "Book not found" });

        await Author.findByIdAndUpdate(deletedBook.author, { $pull: { books: deletedBook._id } });

        res.json({ message: "Book deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = bookRouter;
