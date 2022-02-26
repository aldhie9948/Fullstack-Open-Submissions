import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';
import blogService from '../services/blogs';

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

export const { setUser } = loginSlice.actions;
export default loginSlice.reducer;

export const initializeUser = (userObj) => {
  return async (dispatch) => {
    const loggedUser = await loginService.login(userObj);
    window.localStorage.setItem(
      'loggedBlogsappUser',
      JSON.stringify(loggedUser)
    );
    dispatch(setUser(loggedUser));
    blogService.setToken(loggedUser.token);
  };
};

export const checkUser = () => {
  return (dispatch) => {
    const userLoggedIn = window.localStorage.getItem('loggedBlogsappUser');
    if (userLoggedIn) {
      const user = JSON.parse(userLoggedIn);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    window.localStorage.removeItem('loggedBlogsappUser');
    dispatch(setUser(null));
  };
};
