import { BASE_URL, ADD_TO_CART, CONTENT_TYPE_APPLICATION_JSON } from "../constant/constants";

export const addToCart = async (bookId, quantity) => {
    try {
      const token = localStorage.getItem('token'); 
  
      const response = await fetch(`${BASE_URL}${ADD_TO_CART}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bookId, quantity }),
      });
  
      if (response.ok) {
       
        console.log('Book added to cart successfully');
      } else {
       
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };


  export const getCart = async()=>{
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${BASE_URL}${ADD_TO_CART}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
    
        if (response.ok) {
          const data = await response.json();
          return data;
        } else {
          throw new Error('Error retrieving cart');
        }
      } catch (error) {
        console.error('Error retrieving cart:', error);
        throw error;
      }
  }