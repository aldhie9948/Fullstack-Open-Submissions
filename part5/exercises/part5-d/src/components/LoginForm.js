import React, { useState } from 'react';
import propTypes from 'prop-types';

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = (event) => {
    event.preventDefault();

    handleLogin({
      username,
      password,
    });

    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <form id='form-login' onSubmit={login}>
        <h3>log in to application</h3>
        <div>
          username
          <input
            id='username'
            type='text'
            onChange={({ target }) => setUsername(target.value)}
            value={username}
            name='username'
          />
        </div>
        <div>
          password
          <input
            id='password'
            type='password'
            onChange={({ target }) => setPassword(target.value)}
            value={password}
            name='password'
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = { handleLogin: propTypes.func.isRequired };

export default LoginForm;
