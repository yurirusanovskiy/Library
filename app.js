const express = require('express');
const mongoose = require('mongoose');
const bookRouter = require('./routes/book');
const authorRouter = require('./routes/author');

const app = express();
app.use(express.json());

// Connecting to MongoDB
mongoose.connect('mongodb://localhost:27017/Library')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => {
        console.error('Failed to connect to MongoDB:', err);
        process.exit(1);
    });

// Using routes for books and authors
app.use('/routes/book', bookRouter);    
app.use('/routes/author', authorRouter);

// Disconnecting from MongoDB when the application terminates
process.on('SIGINT', async () => {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
});

// Server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log("Use Postman to test Library");
    console.log("For books http://localhost:3000/routes/book");
    console.log("For authors http://localhost:3000/routes/author");
});

