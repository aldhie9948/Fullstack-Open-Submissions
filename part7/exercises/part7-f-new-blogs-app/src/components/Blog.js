import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBlog, deleteBlog } from '../reducers/blogsReducer';
import { showNotification } from '../reducers/notificationReducer';
const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const blogStyle = {
    padding: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const updateBlogHandler = () => {
    dispatch(updateBlog({ ...blog, likes: blog.likes + 1 }));
  };

  const deleteBlogHandler = () => {
    if (window.confirm(`remove blog "${blog.title}" ?`)) {
      dispatch(deleteBlog(blog));
      const notification = {
        status: 'error',
        message: `delete blog "${blog.title}" by ${blog.author}`,
      };
      dispatch(showNotification(notification));
    }
  };

  const ButtonDelete = () => (
    <button onClick={deleteBlogHandler}>Delete</button>
  );

  const DetailsBlog = () => (
    <div>
      <div className='url'>{blog.url}</div>
      <div className='likes'>{blog.likes}</div>
      <button className='buttonLikes' onClick={updateBlogHandler}>
        like
      </button>
      <div className='author'> {blog.author}</div>
      {blog.user.username === user.username && <ButtonDelete />}
    </div>
  );

  return (
    <div style={blogStyle}>
      {blog.title}{' '}
      <button className='buttonShow' onClick={() => setVisible(!visible)}>
        show
      </button>
      <br />
      <div className='detailsDiv'>{visible && <DetailsBlog />}</div>
    </div>
  );
};

export default Blog;
