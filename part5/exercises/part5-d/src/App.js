import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  const [msg, setMsg] = useState(null);
  const [classMsg, setClassMsg] = useState(null);

  const blogFormRef = useRef();

  const flashMessage = (message, status) => {
    setMsg(message);
    setClassMsg(status);
    setTimeout(() => {
      setMsg(null);
      setClassMsg(null);
    }, 5000);
  };

  useEffect(() => {
    const userLoggedIn = window.localStorage.getItem('loggedBlogsappUser');
    if (userLoggedIn) {
      const user = JSON.parse(userLoggedIn);
      setUser(user);
      blogService.setToken(user.token);
    }
    console.log('fire useEffect Loggedin');
  }, []);

  useEffect(() => {
    if (user) {
      blogService.getAll().then((res) => {
        const blogs = res.sort((a, b) => b.likes - a.likes);
        // .filter((blog) => blog.user.username === user.username);
        setBlogs(blogs);
      });
      console.log('fire useEffect getAll()');
    }
  }, [user]);

  const handleLogin = async (loginObj) => {
    try {
      const loggedUser = await loginService.login(loginObj);

      window.localStorage.setItem(
        'loggedBlogsappUser',
        JSON.stringify(loggedUser)
      );
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
      flashMessage(`Welcome to Blog App, ${loggedUser.name}`, 'success');
    } catch (error) {
      console.error(error);
      flashMessage('wrong username or password', 'error');
    }
    console.log('fire handleLogin');
  };

  const handleLogout = (e) => {
    e.preventDefault();
    window.localStorage.removeItem('loggedBlogsappUser');
    setBlogs([]);
    setUser(null);
    console.log('fire handleLogout');
    flashMessage('logged out successfully', 'success');
  };

  const createBlog = async (newBlogObj) => {
    try {
      const response = await blogService.createBlog(newBlogObj);
      const newBlogs = blogs.concat(response);
      setBlogs(newBlogs);
      flashMessage(
        `a new blog "${response.title} by ${response.author}" added`,
        'success'
      );
      blogFormRef.current.toggleVisibility();
    } catch (error) {
      console.log(error);
    }
  };

  const updateBlog = async (blogObj) => {
    try {
      const updatedBlog = await blogService.updateBlog(blogObj);
      const newBlogsList = blogs
        .filter((blog) => blog.id !== updatedBlog.id)
        .concat(updatedBlog)
        .sort((a, b) => b.likes - a.likes);
      setBlogs(newBlogsList);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBlog = async (blogObj) => {
    try {
      await blogService.deleteBlog(blogObj);
      const blogsList = blogs
        .filter((blog) => blog.id !== blogObj.id)
        .sort((a, b) => b - a);
      window.alert(`remove blog "${blogObj.title}" by ${blogObj.author}`);
      flashMessage(
        `remove blog "${blogObj.title}" by ${blogObj.author}`,
        'error'
      );
      setBlogs(blogsList);
    } catch (error) {
      console.log(error);
    }
  };

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged in{' '}
        <button id='logout-button' onClick={handleLogout}>
          Logout
        </button>
      </p>
      {blogForm()}
      <h2>my blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleUpdate={updateBlog}
          handleDelete={deleteBlog}
          user={user}
        />
      ))}
    </div>
  );

  const loginForm = () => <LoginForm handleLogin={handleLogin} />;

  const blogForm = () => (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <BlogForm handleCreate={createBlog} />
    </Togglable>
  );

  return (
    <div>
      <Notification status={classMsg} message={msg} />
      {user !== null ? blogList() : loginForm()}
    </div>
  );
};

export default App;
