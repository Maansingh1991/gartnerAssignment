const mongoose = require('mongoose');
const Book = require('../models/Book');
const mongoDbConfig = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/mydatabase', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
    const books = Array.from({ length: 50 }, (_, index) => ({
      title: `Book ${index + 1}`,
      author: `Author ${index + 1}`,
      price: Math.floor(Math.random() * 100) + 1,
      rating: Math.floor(Math.random() * 5) + 1,
    }));
    Book.insertMany(books)
      .then(() => {
        console.log('Books inserted successfully');
      })
      .catch((error) => {
        console.error('Error inserting books:', error);
      });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = mongoDbConfig;
