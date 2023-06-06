import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import BookListing from '../../component/BookListing';
import { searchBook, addToCart } from '../../api/book';
import { useNavigate } from 'react-router-dom';

jest.mock('../../api/book');
jest.mock('../../api/cart');
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

const theme = createTheme({
  palette: {
    primary: {
      main: '#c49000',
    },
  },
});

describe('BookListing', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useNavigate.mockReturnValue(jest.fn());
    window.alert = jest.fn();
  });

  test('renders book listing', () => {
    render(
      <ThemeProvider theme={theme}>
        <BookListing />
      </ThemeProvider>
    );

    expect(screen.getByText('Book Listing')).toBeInTheDocument();
  });

  test('performs search and renders search results', async () => {
    const searchBookMock = searchBook.mockResolvedValue([
      { _id: '1', title: 'Book 1', author: 'Author 1', price: 10, rating: 4.5 },
      { _id: '2', title: 'Book 2', author: 'Author 2', price: 15, rating: 4.2 },
    ]);

    render(
      <ThemeProvider theme={theme}>
        <BookListing />
      </ThemeProvider>
    );

    const searchInput = screen.getByLabelText('Search Book');
    const searchButton = screen.getByRole('button', { name: 'Search' });

    fireEvent.change(searchInput, { target: { value: 'test' } });
    fireEvent.click(searchButton);

    expect(searchBookMock).toHaveBeenCalledWith('test');
    expect(await screen.findByText('Book 1')).toBeInTheDocument();
    expect(await screen.findByText('Book 2')).toBeInTheDocument();
  });

 

  });
