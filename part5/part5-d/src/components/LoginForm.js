import React from 'react';
import propTypes from 'prop-types';

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div>
          username
          <input
            id='username'
            type='text'
            value={username}
            name='Username'
            onChange={handleUsernameChange}
            className='m-1'
          />
        </div>
        <div>
          password
          <input
            id='password'
            type='password'
            value={password}
            name='Password'
            onChange={handlePasswordChange}
            className='m-1'
          />
        </div>
        <button id='login-button' type='submit'>
          login
        </button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  handleSubmit: propTypes.func.isRequired,
  handleUsernameChange: propTypes.func.isRequired,
  handlePasswordChange: propTypes.func.isRequired,
  username: propTypes.string.isRequired,
  password: propTypes.string.isRequired,
};

export default LoginForm;
