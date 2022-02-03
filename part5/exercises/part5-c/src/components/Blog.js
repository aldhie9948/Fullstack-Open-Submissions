import React, { useState } from 'react';
const Blog = ({ blog, handleUpdate, handleDelete, user }) => {
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    padding: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const updateBlog = () => {
    handleUpdate({ ...blog, likes: blog.likes + 1 });
  };

  const deleteBlog = () => {
    if (window.confirm(`remove blog "${blog.title}" ?`)) handleDelete(blog);
  };

  const buttonDelete = () => <button onClick={deleteBlog}>remove</button>;

  const detailsBlog = () => (
    <div>
      <div className='url'>{blog.url}</div>
      <div className='likes'>{blog.likes}</div>
      <button className='buttonLikes' onClick={updateBlog}>
        like
      </button>
      <div className='author'> {blog.author}</div>
      {blog.user.username === user.username ? buttonDelete() : null}
    </div>
  );

  return (
    <div style={blogStyle}>
      {blog.title}{' '}
      <button className='buttonShow' onClick={() => setVisible(!visible)}>
        show
      </button>
      <br />
      <div className='detailsDiv'>{visible ? detailsBlog() : null}</div>
    </div>
  );
};

export default Blog;
