import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  notification: { type: "", message: "" },
  curUser: { username: "", name: "", token: "" },
  users: [],
};

const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setCurUser(state, action) {
      return { ...state, curUser: action.payload };
    },
    setAllUsers(state, action) {
      return { ...state, users: action.payload };
    },
    setNotification(state, action) {
      return {
        ...state,
        notification: {
          type: action.payload.type,
          message: action.payload.message,
        },
      };
    },
  },
});

export const { setCurUser } = userSlice.actions;

const { setAllUsers, setNotification } = userSlice.actions;
let prevTimeout;

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/api/login", credentials);
      localStorage.setItem("loggedBlogAppUser", JSON.stringify(res.data));
      dispatch(setCurUser(res.data));
    } catch (exception) {
      clearTimeout(prevTimeout);

      dispatch(
        setNotification({
          type: "error",
          message: exception.response.data.error,
        })
      );

      prevTimeout = setTimeout(
        () => dispatch(setNotification(initialState.notification)),
        5000
      );
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    localStorage.removeItem("loggedBlogAppUser");
    dispatch(setCurUser(initialState.curUser));
  };
};

export const getAllUsers = () => {
  return async (dispatch) => {
    const res = await axios.get("/api/users");
    dispatch(setAllUsers(res.data));
  };
};

export default userSlice.reducer;
