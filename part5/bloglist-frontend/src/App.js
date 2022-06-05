import React, { useState, useEffect, useRef } from "react";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import loginService from "./services/login";
import blogService from "./services/blogs";
import "./styles/index.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notif, setNotif] = useState({});
  const blogFormRef = useRef();

  useEffect(() => {
    (async () => {
      const loggedUserJSON = localStorage.getItem("loggedUserBlogApp");
      if (loggedUserJSON) {
        try {
          const user = JSON.parse(loggedUserJSON);
          setUser(user);
          blogService.setToken(user.token);
          setBlogs(
            (await blogService.getAll()).sort((a, b) => b.likes - a.likes)
          );
        } catch (exception) {
          setNotif({ type: "error", message: exception });
          setTimeout(() => setNotif({}), 5000);
        }
      }
    })();
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const newUser = await loginService.login({ username, password });
      localStorage.setItem("loggedUserBlogApp", JSON.stringify(newUser));
      blogService.setToken(newUser.token);
      setUser(newUser);
      setUsername("");
      setPassword("");
      setBlogs((await blogService.getAll()).sort((a, b) => b.likes - a.likes));
    } catch (exception) {
      setNotif({ type: "error", message: exception });
      setTimeout(() => setNotif({}), 5000);
    }
  };

  const logout = () => {
    localStorage.removeItem("loggedUserBlogApp");
    blogService.setToken(null);
    setUser(null);
  };

  const addBlog = async (newBlog) => {
    try {
      const addedBlog = await blogService.create(newBlog);
      blogFormRef.current.toggleVisibility();
      setBlogs(blogs.concat(addedBlog));
      setNotif({
        type: "success",
        message: `${newBlog.title} by ${newBlog.author} added`,
      });
      setTimeout(() => setNotif({}), 5000);
    } catch (exception) {
      setNotif({ type: "error", message: exception });
      setTimeout(() => setNotif({}), 5000);
    }
  };

  const handleLike = async (blog) => {
    try {
      await blogService.update(blog.id, blog);
      const blogsNow = [...blogs];
      blogsNow.find((b) => b.id === blog.id).likes += 1;
      setBlogs(blogsNow.sort((a, b) => b.likes - a.likes));
    } catch (exception) {
      setNotif({ type: "error", message: exception });
      setTimeout(() => setNotif({}), 5000);
    }
  };

  const handleDelete = async ({ title, author, id }) => {
    if (window.confirm(`Remove ${title} by ${author}?`)) {
      try {
        await blogService.delete(id);
        setBlogs(blogs.filter((b) => b.id !== id));
      } catch (exception) {
        setNotif({ type: "error", message: exception });
        setTimeout(() => setNotif({}), 5000);
      }
    }
  };

  if (!user) {
    return (
      <>
        <h2>log in to application</h2>
        <Notification notif={notif} />
        <LoginForm
          params={{ username, setUsername, password, setPassword, handleLogin }}
        />
      </>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notif={notif} />
      <p>
        {user.name} logged in <button onClick={logout}> logout </button>
      </p>
      <h2>create new</h2>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm addBlog={addBlog} />
      </Togglable>

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          id={blog.id}
          blog={blog}
          curUser={user.username}
          handleLike={handleLike}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default App;
