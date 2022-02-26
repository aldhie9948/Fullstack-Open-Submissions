import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './reducers/loginReducer';
import blogsReducer from './reducers/blogsReducer';
import notificationReducer from './reducers/notificationReducer';

const store = configureStore({
  reducer: {
    user: loginReducer,
    blogs: blogsReducer,
    notification: notificationReducer,
  },
});

export default store;
