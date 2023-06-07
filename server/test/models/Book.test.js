const mongoose = require('mongoose');
const Book = require('../../models/Book');

describe('Book Model', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/testdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should save a new book to the database', async () => {
    const newBook = new Book({
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      price: 10.99,
      rating: 4.5,
    });

    const savedBook = await newBook.save();

    const fetchedBook = await Book.findById(savedBook._id);

    expect(fetchedBook.title).toBe('The Great Gatsby');
    expect(fetchedBook.author).toBe('F. Scott Fitzgerald');
    expect(fetchedBook.price).toBe(10.99);
    expect(fetchedBook.rating).toBe(4.5);
  });

  it('should throw validation error when required fields are missing', async () => {
    const newBook = new Book({
      author: 'John Doe',
      price: 19.99,
      rating: 3.8,
    });

  
    let error;
    try {
      await newBook.save();
    } catch (err) {
      error = err;
    }

   
    expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
  });
});
