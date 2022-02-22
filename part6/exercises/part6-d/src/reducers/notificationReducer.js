import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  visibility: false,
  message: null,
  timeoutID: null,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      const content = action.payload.content;
      const timeoutID = action.payload.timeoutID;
      state.visibility = true;
      state.message = content;
      state.timeoutID = timeoutID;
    },
    hideNotification(state, action) {
      state.visibility = false;
      state.message = null;
      state.timeoutID = null;
    },
  },
});

export const setNotification = (
  content = null,
  time = 5000,
  oldTimeoutID = null
) => {
  return (dispatch) => {
    clearTimeout(oldTimeoutID);
    const timeoutID = setTimeout(() => {
      dispatch(hideNotification());
    }, time);
    dispatch(showNotification({ content, timeoutID }));
  };
};

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
