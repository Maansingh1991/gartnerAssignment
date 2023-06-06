import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from '../Login';
import BookListing from './BookListing';
import CartPage from './CartPage';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#c49000',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/books" element={<BookListing />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
