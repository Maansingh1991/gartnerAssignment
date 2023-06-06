import { BASE_URL, SEARCH_BOOK, CONTENT_TYPE_APPLICATION_JSON } from "../constant/constants";



export const searchBook = async (searchQuery) => {
    try {
      const token = localStorage.getItem('token'); // Get the token from local storage
  
      const response = await fetch(`${BASE_URL}${SEARCH_BOOK}${searchQuery}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
        },
      });
  
      if (response.ok) {
        const data = await response.json();
      
        return data;
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      throw error;
      console.error('Error:', error);
    }
  };
  