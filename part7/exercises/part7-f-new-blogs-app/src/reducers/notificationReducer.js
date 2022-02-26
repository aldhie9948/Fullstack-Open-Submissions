import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: null,
  message: null,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
  },
});

export const { setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;

export const showNotification = (notifObj) => {
  return (dispatch) => {
    dispatch(setNotification(notifObj));
    setTimeout(() => {
      dispatch(setNotification(initialState));
    }, 5000);
  };
};
