import React from 'react';
import BlogForm from './BlogForm';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../reducers/loginReducer';
import { resetBlogs } from '../reducers/blogsReducer';
import { showNotification } from '../reducers/notificationReducer';
import Blog from './Blog';

const BlogsList = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
    dispatch(resetBlogs());

    const setNotif = { status: 'error', message: 'Logged out successfully' };
    dispatch(showNotification(setNotif));
  };

  return (
    <div>
      <h2>Blogs App</h2>
      <p>
        {user.name} logged in <button onClick={logoutHandler}>Logout</button>
      </p>
      <BlogForm />
      <h2>My Blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogsList;
