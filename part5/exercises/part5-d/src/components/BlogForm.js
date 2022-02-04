import React, { useState } from 'react';
import propTypes from 'prop-types';

const BlogForm = ({ handleCreate }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const createBlog = (event) => {
    event.preventDefault();
    handleCreate({
      title,
      author,
      url,
    });

    setTitle('');
    setUrl('');
    setAuthor('');
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createBlog}>
        <div style={{ margin: '0.5rem' }}>
          title:
          <input
            id='title'
            type='text'
            name='title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          ></input>
        </div>
        <div style={{ margin: '0.5rem' }}>
          author:
          <input
            id='author'
            type='text'
            name='author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          ></input>
        </div>
        <div style={{ margin: '0.5rem' }}>
          url:
          <input
            id='url'
            type='text'
            name='url'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          ></input>
        </div>
        <button id='create-button' type='submit'>
          Create
        </button>
      </form>
    </div>
  );
};

BlogForm.propTypes = { handleCreate: propTypes.func.isRequired };

export default BlogForm;
