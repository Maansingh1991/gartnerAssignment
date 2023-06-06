const mongoose = require('mongoose');
const Book = require('../../models/Book');

describe('Book Model', () => {
  beforeAll(async () => {
    // Connect to the test database before running the tests
    await mongoose.connect('mongodb://localhost:27017/testdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    // Disconnect from the test database after running the tests
    await mongoose.connection.close();
  });

  it('should save a new book to the database', async () => {
    // Create a new book instance
    const newBook = new Book({
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      price: 10.99,
      rating: 4.5,
    });

    // Save the book to the database
    const savedBook = await newBook.save();

    // Fetch the book from the database
    const fetchedBook = await Book.findById(savedBook._id);

    // Assertions
    expect(fetchedBook.title).toBe('The Great Gatsby');
    expect(fetchedBook.author).toBe('F. Scott Fitzgerald');
    expect(fetchedBook.price).toBe(10.99);
    expect(fetchedBook.rating).toBe(4.5);
  });

  it('should throw validation error when required fields are missing', async () => {
    // Create a new book instance with missing required fields
    const newBook = new Book({
      author: 'John Doe',
      price: 19.99,
      rating: 3.8,
    });

    // Try to save the book to the database
    let error;
    try {
      await newBook.save();
    } catch (err) {
      error = err;
    }

    // Assertion
    expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
  });
});
