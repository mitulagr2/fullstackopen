import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useMatch,
} from "react-router-dom";
import { initBlogs } from "./reducers/blogReducer";
import { setCurUser, getAllUsers } from "./reducers/userReducer";

import BlogListScreen from "./screens/BlogList";
import BlogViewScreen from "./screens/BlogView";
import LoginScreen from "./screens/Login";
import UserListScreen from "./screens/UserList";
import UserViewScreen from "./screens/UserView";

import Navbar from "./components/Navbar";
import Notification from "./components/Notification";

import Container from "@material-ui/core/Container";
import "./styles/index.css";

// /public/*.png can be deleted?
// split axios services and reducer?
// how to break your react application blog (npm/yarn update)

const App = () => {
  const { curUser, users } = useSelector(({ userData }) => userData);
  const blogs = useSelector(({ blogData }) =>
    [...blogData.blogs].sort((a, b) => b.likes - a.likes)
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoginScreen = useMatch("/login");
  const isBlogViewScreen = useMatch("/blogs/:id");
  const isUserViewScreen = useMatch("/users/:id");

  useEffect(() => {
    if (!curUser.token.length) {
      const prevUser = localStorage.getItem("loggedBlogAppUser");

      if (prevUser) {
        const user = JSON.parse(prevUser);
        dispatch(setCurUser(user));
        isLoginScreen && navigate("/");
      } else {
        !isLoginScreen && navigate("/login");
      }
    } else if (!blogs.length) {
      dispatch(initBlogs());
      dispatch(getAllUsers());
    }
  });

  const blog = isBlogViewScreen
    ? blogs.find((b) => b.id === isBlogViewScreen.params.id)
    : null;

  const user = isUserViewScreen
    ? users.find((u) => u.id === isUserViewScreen.params.id)
    : null;

  return (
    <Container>
      <Navbar name={curUser.name} />
      <Notification />

      <Routes>
        <Route path="/login" element={<LoginScreen />} />

        <Route path="/users/:id" element={<UserViewScreen user={user} />} />
        <Route path="/users" element={<UserListScreen users={users} />} />

        <Route
          path="/blogs/:id"
          element={<BlogViewScreen blog={blog} curUser={curUser} />}
        />

        <Route path="/blogs" element={<Navigate replace to="/" />} />
        <Route path="/" element={<BlogListScreen blogs={blogs} />} />
      </Routes>
    </Container>
  );
};

export default App;
