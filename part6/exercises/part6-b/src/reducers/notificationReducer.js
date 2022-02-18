import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  visibility: false,
  message: null,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      const content = action.payload;
      state.visibility = true;
      state.message = content;
    },
    hideNotification(state, action) {
      state.visibility = false;
      state.message = null;
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
