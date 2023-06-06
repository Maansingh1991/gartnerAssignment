import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getCart } from '../api/cart';
import DeleteIcon from '@mui/icons-material/Delete';

const theme = createTheme({
  palette: {
    primary: {
      main: '#c49000',
    },
  },
});

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCartItems = async () => {
    try {
      const cart = await getCart();
      setCartItems(cart.books);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleRemoveFromCart = (bookId) => {
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: 400 }}>
          <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Cart</h2>
          <List>
            {cartItems.map((book) => (
              <ListItem
                key={book.bookId._id}
                sx={{
                  border: '1px solid #ccc',
                  borderRadius: 5,
                  marginBottom: 10,
                  display: 'flex',
                  alignItems: 'center',
                  padding: 10,
                  backgroundColor: '#f5f5f5',
                }}
              >
                <ListItemText primary={book.bookId.title} />
                <ListItemText primary={book.bookId.author} />
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleRemoveFromCart(book.id)}
                  sx={{
                    marginLeft: 'auto',
                    color: '#ff0000',
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default CartPage;
