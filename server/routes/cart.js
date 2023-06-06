const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Book = require('../models/Book');

// Get the user's cart
router.get('/',  async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ userId }).populate('books.bookId');

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.json(cart);
  } catch (error) {
    console.error('Error getting cart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add a book to the cart
router.post('/', async (req, res) => {
  try {
    const { bookId, quantity } = req.body;
    const userId = req.user._id;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        books: [],
      });
    }

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const bookExists = cart.books.find((item) => item.bookId.toString() === bookId);

    if (bookExists) {
      return res.status(400).json({ message: 'Book already exists in the cart' });
    }

    cart.books.push({ bookId, quantity });
    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error('Error adding book to cart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// Update the quantity of a book in the cart
router.put('/:bookId', async (req, res) => {
  try {
    const { bookId } = req.params;
    const { quantity } = req.body;
    const userId = req.user._id;

    const cart = await Cart.findOne({ userId, 'books.bookId': bookId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.books.forEach((item) => {
      if (item.bookId.toString() === bookId) {
        item.quantity = quantity;
      }
    });

    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Remove a book from the cart
router.delete('/:bookId',  async (req, res) => {
  try {
    const { bookId } = req.params;
    const userId = req.user._id;

    const cart = await Cart.findOne({ userId, 'books.bookId': bookId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.books = cart.books.filter((item) => item.bookId.toString() !== bookId);
    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error('Error removing book from cart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Clear the user's cart
router.delete('/', async (req, res) => {
  try {
    const userId = req.user._id;
    await Cart.deleteOne({ userId });
    res.json({ message: 'Cart cleared' });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
