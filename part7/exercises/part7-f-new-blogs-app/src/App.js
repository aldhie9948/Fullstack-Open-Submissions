import React, { useEffect } from 'react';
import LoginForm from './components/LoginForm';
import BlogsList from './components/BlogsList';
import { useDispatch, useSelector } from 'react-redux';
import { checkUser } from './reducers/loginReducer';
import { initializeBlogs } from './reducers/blogsReducer';
import Notification from './components/Notification';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(checkUser());
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(initializeBlogs());
    }
  }, [user]);

  return (
    <div>
      <Notification />
      {user !== null ? <BlogsList /> : <LoginForm />}
    </div>
  );
};

export default App;
