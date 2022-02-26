import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    updateBlogList(state, action) {
      const updatedBlog = action.payload;
      const newUpdatedBlogList = state
        .filter((blog) => blog.id !== updatedBlog.id)
        .concat(updatedBlog)
        .sort((a, b) => b.likes - a.likes);
      return newUpdatedBlogList;
    },
    deleteBlogAction(state, action) {
      const deletedBlog = action.payload;
      const blogList = state
        .filter((blog) => blog.id !== deletedBlog.id)
        .sort((a, b) => b.likes - a.likes);
      return blogList;
    },
  },
});

export const { setBlogs, appendBlog, updateBlogList, deleteBlogAction } =
  blogsSlice.actions;
export default blogsSlice.reducer;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
    dispatch(setBlogs(sortedBlogs));
  };
};

export const resetBlogs = () => {
  return (dispatch) => dispatch(setBlogs([]));
};

export const createBlog = (blogObj) => {
  return async (dispatch) => {
    const response = await blogService.createBlog(blogObj);
    dispatch(appendBlog(response));
  };
};

export const updateBlog = (blogObj) => {
  return async (dispatch) => {
    const response = await blogService.updateBlog(blogObj);
    dispatch(updateBlogList(response));
  };
};

export const deleteBlog = (blogObj) => {
  return async (dispatch) => {
    await blogService.deleteBlog(blogObj);
    dispatch(deleteBlogAction(blogObj));
  };
};
