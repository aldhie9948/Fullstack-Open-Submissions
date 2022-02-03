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
    <>
      {blog.url}
      <br />
      {blog.likes}
      <button onClick={updateBlog}>like</button>
      <br />
      {blog.author}
      <br />
      {blog.user.username === user.username ? buttonDelete() : null}
    </>
  );

  console.log(
    blog.user.username === user.username,
    blog.user.username,
    blog,
    user.username
  );

  return (
    <div style={blogStyle}>
      {blog.title} <button onClick={() => setVisible(!visible)}>show</button>
      <br />
      {visible ? detailsBlog() : null}
    </div>
  );
};

export default Blog;
