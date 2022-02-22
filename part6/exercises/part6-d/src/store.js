import { configureStore } from '@reduxjs/toolkit';
import anectdoteReducer from './reducers/anecdoteReducer';
import notificationReducer from './reducers/notificationReducer';
import filterReducer from './reducers/filterReducer';

const store = configureStore({
  reducer: {
    anecdote: anectdoteReducer,
    notification: notificationReducer,
    filter: filterReducer,
  },
});

export default store;
