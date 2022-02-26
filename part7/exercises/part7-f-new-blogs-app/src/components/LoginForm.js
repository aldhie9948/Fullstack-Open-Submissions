import React from 'react';
import { initializeUser } from '../reducers/loginReducer';
import { useDispatch } from 'react-redux';
import { useField } from '../hooks';

const LoginForm = () => {
  const username = useField('text');
  const password = useField('password');
  const dispatch = useDispatch();

  const spreadAttrField = (objField) => {
    // eslint-disable-next-line
    const { reset, ...attr } = objField;
    return attr;
  };

  const login = (event) => {
    event.preventDefault();
    dispatch(
      initializeUser({
        username: username.value,
        password: password.value,
      })
    );
    username.reset();
    password.reset();
  };

  return (
    <div>
      <form id='form-login' onSubmit={login}>
        <h3>log in to application</h3>
        <div>
          username
          <input {...spreadAttrField(username)} />
        </div>
        <div>
          password
          <input {...spreadAttrField(password)} />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
