import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => (token = `bearer ${newToken}`);

const config = () => {
  return { headers: { Authorization: token } };
};

const getAll = async () => {
  const response = await axios.get(baseUrl, config());
  return response.data;
};

const createBlog = async (newBlog) => {
  const response = await axios.post(baseUrl, newBlog, config());
  return response.data;
};

const updateBlog = async (blogObj) => {
  const response = await axios.put(
    `${baseUrl}/${blogObj.id}`,
    blogObj,
    config()
  );
  return response.data;
};

const deleteBlog = async (blogObj) => {
  const response = await axios.delete(`${baseUrl}/${blogObj.id}`, config());
  return response.data;
};

// eslint-disable-next-line
export default { getAll, createBlog, updateBlog, deleteBlog, setToken };
