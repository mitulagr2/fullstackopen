import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  notification: { type: "", message: "" },
  blogs: [],
};

const blogSlice = createSlice({
  name: "blogData",
  initialState,
  reducers: {
    increaseLikes({ blogs }, action) {
      blogs.find((b) => b.id === action.payload).likes += 1;
    },
    appendBlog({ blogs }, action) {
      blogs.push(action.payload);
    },
    removeBlog({ blogs }, action) {
      for (let i = 0; i < blogs.length; ++i)
        blogs[i].id === action.payload && blogs.splice(i, 1);
    },
    setBlogs(state, action) {
      return { ...state, blogs: action.payload };
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

const { increaseLikes, appendBlog, removeBlog, setBlogs, setNotification } =
  blogSlice.actions;

const baseUrl = "/api/blogs";
let config, prevTimeout;

const handleNotification = (dispatch, type, message) => {
  clearTimeout(prevTimeout);
  dispatch(setNotification({ type, message }));

  prevTimeout = setTimeout(
    () => dispatch(setNotification(initialState.notification)),
    5000
  );
};

export const initBlogs = () => {
  return async (dispatch, getState) => {
    const { token } = getState().userData.curUser;
    config = { headers: { Authorization: "Bearer " + token } };

    try {
      const res = await axios.get(baseUrl, config);
      dispatch(setBlogs(res.data));
    } catch (exception) {
      handleNotification(dispatch, "error", exception.response.data.error);
    }
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(baseUrl, blog, config);
      dispatch(appendBlog(res.data));
      handleNotification(
        dispatch,
        "success",
        `${res.data.title} by ${res.data.author} added`
      );
    } catch (exception) {
      handleNotification(dispatch, "error", exception.response.data.error);
    }
  };
};

export const likeBlog = (id) => {
  return async (dispatch) => {
    try {
      await axios.patch(`${baseUrl}/${id}`, null, config); //confirm this
      dispatch(increaseLikes(id));
    } catch (exception) {
      handleNotification(dispatch, "error", exception.response.data.error);
    }
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${baseUrl}/${id}`, config);
      dispatch(removeBlog(id));
    } catch (exception) {
      handleNotification(dispatch, "error", exception.response.data.error);
    }
  };
};

export default blogSlice.reducer;
