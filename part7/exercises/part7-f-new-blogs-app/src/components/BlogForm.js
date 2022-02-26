import React, { useRef } from 'react';
import { createBlog } from '../reducers/blogsReducer';
import { useDispatch } from 'react-redux';
import Togglable from './Togglable';
import { useField } from '../hooks';
import { showNotification } from '../reducers/notificationReducer';

const BlogForm = () => {
  const title = useField('text');
  const author = useField('text');
  const url = useField('text');

  const dispatch = useDispatch();
  const togglableRef = useRef();

  const spreadAttrField = (obj) => {
    // eslint-disable-next-line
    const { reset, ...attr } = obj;
    return attr;
  };

  const createBlogHandler = (event) => {
    event.preventDefault();
    const blogObj = {
      title: title.value,
      author: author.value,
      url: url.value,
    };

    const notification = {
      status: 'success',
      message: `created blog "${title.value}" by ${author.value}`,
    };

    dispatch(createBlog(blogObj));
    dispatch(showNotification(notification));

    togglableRef.current.toggleVisibility();

    title.reset();
    author.reset();
    url.reset();
  };

  return (
    <div>
      <h2>create new</h2>
      <Togglable buttonLabel='Create new blog' ref={togglableRef}>
        <form onSubmit={createBlogHandler}>
          <div style={{ margin: '0.5rem' }}>
            title:
            <input {...spreadAttrField(title)}></input>
          </div>
          <div style={{ margin: '0.5rem' }}>
            author:
            <input {...spreadAttrField(author)}></input>
          </div>
          <div style={{ margin: '0.5rem' }}>
            url:
            <input {...spreadAttrField(url)}></input>
          </div>
          <button id='create-button' type='submit'>
            Create
          </button>
        </form>
      </Togglable>
    </div>
  );
};

export default BlogForm;
