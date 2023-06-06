import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { searchBook } from "../api/book";
import { addToCart } from "../api/cart";
import { useNavigate } from 'react-router-dom';
const theme = createTheme({
  palette: {
    primary: {
      main: '#c49000',
    },
  },
});

const BookListing = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([
  ]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (searchQuery) {
      try{
      let data = await searchBook(searchQuery);
      setSearchResults(data);
      }catch(e){
        alert("API Failed. Please login again");
        navigate('/login');
      }
    }
  };

  const handleAddToCart = async (bookId) => {
  try{
    await addToCart(bookId)
    alert("Added to cart")
  }
  catch(e){
    alert("Unable to add to cart")
  }
  };

  const renderBooks = () => {
    return searchResults.map((book) => (
      <Card key={book._id} style={{ width: 300, margin: '10px' }}>
        <CardContent>
          <Typography variant="h6">{book.title}</Typography>
          <Typography variant="subtitle1">{book.author}</Typography>
          <Typography variant="body1">Price: ${book.price}</Typography>
          <Typography variant="body1">Rating: {book.rating}</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleAddToCart(book._id)}
          >
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    ));
  };

  return (
    <ThemeProvider theme={theme}>
      <Box mt={2} ml={2} display="flex" alignItems="center">
        <Typography variant="h6">Book Listing</Typography>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<AddCircleOutlineIcon />}
          style={{ marginLeft: 'auto' }}
        >
          Add a Book
        </Button>
      </Box>
      <Box m={2}>
        <TextField
          label="Search Book"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          variant="outlined"
          color="primary"
          fullWidth
          mb={2}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </Box>
      <Box display="flex" justifyContent="center" flexWrap="wrap">
        {renderBooks()}
      </Box>
    </ThemeProvider>
  );
};

export default BookListing;
