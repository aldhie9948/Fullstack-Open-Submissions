import axios from 'axios';
const baseUrl = '/api/login';

const login = async (userData) => {
  const response = await axios.post(baseUrl, userData);
  return response.data;
};

// eslint-disable-next-line
export default { login };
