const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const { authenticate } = require('../middleware/auth');


router.post('/', async (req, res) => {
  try {
    const { title, author, price, rating } = req.body;

    const book = new Book({ title, author, price, rating });
    await book.save();

    res.status(201).json(book);
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.get('/', async (req, res) => {
  const searchQuery = req.query.search;

  try {
    const books = await Book.find({
      $or: [
        { title: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive search on title
        { author: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive search on author
      ],
    });

    res.json(books);
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(book);
  } catch (error) {
    console.error('Error getting book:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const { title, author, price, rating } = req.body;

    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, price, rating },
      { new: true }
    );

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(book);
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndRemove(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json({ message: 'Book deleted' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
