import { createSlice } from "@reduxjs/toolkit";

const initialState = "";
const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    update(state, action) {
      return (state = action.payload);
    },
  },
});

const { update } = notificationSlice.actions;

export const setNotification =
  (notification, seconds, host) => async (dispatch) => {
    clearTimeout(host.dataset.timeoutId);
    dispatch(update(notification));

    host.dataset.timeoutId = setTimeout(
      () => dispatch(update("")),
      seconds * 1000
    );
  };

export default notificationSlice.reducer;
