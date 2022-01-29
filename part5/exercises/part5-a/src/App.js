import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [msg, setMsg] = useState(null);
  const [classMsg, setClassMsg] = useState(null);

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
      blogService.getAll().then((res) => setBlogs(res));
      console.log('fire useEffect getAll()');
    }
  }, [user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const loggedUser = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem(
        'loggedBlogsappUser',
        JSON.stringify(loggedUser)
      );
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
      setUsername('');
      setPassword('');
      flashMessage(`Welcome to Blog App, ${loggedUser.name}`, 'success');
    } catch (error) {
      console.error(error);
      flashMessage(`wrong username or password`, 'error');
    }
    console.log('fire handleLogin');
  };

  const handleLogout = (e) => {
    e.preventDefault();
    window.localStorage.removeItem('loggedBlogsappUser');
    setBlogs([]);
    setUser(null);
    console.log('fire handleLogout');
    flashMessage(`logged out successfully`, 'success');
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const newBlog = {
        title,
        author,
        url,
      };

      const response = await blogService.createBlog(newBlog);
      const newBlogs = blogs.concat(response);
      setBlogs(newBlogs);
      setTitle('');
      setAuthor('');
      setUrl('');
      flashMessage(
        `a new blog "${response.title} by ${response.author}" added`,
        'success'
      );
    } catch (error) {
      console.log(error);
    }
  };

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged in <button onClick={handleLogout}>Logout</button>
      </p>
      {blogForm()}
      <h2>my blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );

  const loginForm = () => (
    <form>
      <h3>log in to application</h3>
      <div>
        username
        <input
          type='text'
          onChange={({ target }) => setUsername(target.value)}
          value={username}
          name='username'
        />
      </div>
      <div>
        password
        <input
          type='password'
          onChange={({ target }) => setPassword(target.value)}
          value={password}
          name='password'
        />
      </div>
      <button type='submit' onClick={handleLogin}>
        Login
      </button>
    </form>
  );

  const blogForm = () => (
    <div>
      <h2>create new</h2>
      <form>
        <div style={{ margin: '0.5rem' }}>
          title:
          <input
            type='text'
            name='title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          ></input>
        </div>
        <div style={{ margin: '0.5rem' }}>
          author:
          <input
            type='text'
            name='author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          ></input>
        </div>
        <div style={{ margin: '0.5rem' }}>
          url:
          <input
            type='text'
            name='url'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          ></input>
        </div>
        <button onClick={handleCreate}>Create</button>
      </form>
    </div>
  );

  return (
    <div>
      <Notification status={classMsg} message={msg} />
      {user !== null ? blogList() : loginForm()}
    </div>
  );
};

export default App;
