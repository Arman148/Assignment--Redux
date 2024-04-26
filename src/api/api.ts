import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchItems = () => {
  return axios.get(`${API_BASE_URL}/todos`);
};