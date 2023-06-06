const mongoose = require('mongoose');
const Cart = require('../../models/Cart');
const User = require('../../models/User');
const Book = require('../../models/Book');

describe('Cart Model', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should create a new cart with the provided data', () => {
    
    const user = {
      _id: 'user-id',
      name: 'Manish',
    };
  
    
    const book = {
      _id: 'book-id',
      title: 'The Great Gatsby',
    };
  
    
    const newCart = new Cart({
      userId: user._id,
      books: [
        {
          bookId: book._id,
          quantity: 2,
        },
      ],
    });
  
    
    expect(newCart.userId).toBe(user._id);
    expect(newCart.books[0].bookId).toBe(book._id);
    expect(newCart.books[0].quantity).toBe(2);
  });
  

  it('should throw a validation error when required fields are missing', async () => {
    const newCart = new Cart({
      books: [
        {
          bookId: new mongoose.Types.ObjectId(),
        },
      ],
    });

    let error;
    try {
      await newCart.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
  });
});
