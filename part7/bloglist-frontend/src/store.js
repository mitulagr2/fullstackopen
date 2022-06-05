import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./reducers/blogReducer";
import userReducer from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    blogData: blogReducer,
    userData: userReducer,
  },
});

export default store;
