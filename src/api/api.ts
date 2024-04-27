import axios from 'axios';

// the base URL for API
const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

// function to fetch items from the API
export const fetchItems = () => {
  return axios.get(`${API_BASE_URL}/todos`);
};