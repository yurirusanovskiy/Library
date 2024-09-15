const express = require('express');
const authorRouter = express.Router();
const Author = require('../models/Author');
const Book = require('../models/Book');

// Get all authors
authorRouter.get('/', async (req, res) => {
    try {
        const authors = await Author.find().populate('books');
        res.json(authors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get author by ID and their books
authorRouter.get('/:id', async (req, res) => {
    try {
        const author = await Author.findById(req.params.id).populate('books');
        if (!author) return res.status(404).json({ message: "Author not found" });
        res.json(author);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new author
authorRouter.post('/', async (req, res) => {
    try {
        const newAuthor = new Author(req.body);
        await newAuthor.save();
        res.status(201).json(newAuthor);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update an author
authorRouter.put('/:id', async (req, res) => {
    try {
        const updatedAuthor = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAuthor) return res.status(404).json({ message: "Author not found" });
        res.json(updatedAuthor);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete an author
authorRouter.delete('/:id', async (req, res) => {
    try {
        const deletedAuthor = await Author.findByIdAndDelete(req.params.id);
        if (!deletedAuthor) return res.status(404).json({ message: "Author not found" });
        res.json({ message: "Author deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = authorRouter;

