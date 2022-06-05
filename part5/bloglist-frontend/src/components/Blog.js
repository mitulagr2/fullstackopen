import { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, curUser, handleLike, handleDelete }) => {
  const [toShow, setToShow] = useState(false);

  const toggleVisibility = () => {
    setToShow(!toShow);
  };

  return (
    <div className="blog">
      <span>
        {blog.title} {blog.author}{" "}
      </span>
      <button onClick={toggleVisibility}>{toShow ? "hide" : "view"}</button>
      <span id="togglable-content" style={{ display: toShow ? "" : "none" }}>
        <br /> {blog.url}
        <br /> <span id="blog-likes">{blog.likes} </span>
        <button
          id="like-button"
          onClick={() => {
            handleLike(blog);
          }}
        >
          {" "}
          like{" "}
        </button>
        <br /> {blog.author}
        {blog.user.username === curUser && (
          <>
            <br />
            <button id="delete-button" onClick={() => handleDelete(blog)}>
              {" "}
              remove{" "}
            </button>
          </>
        )}
      </span>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  }),
  curUser: PropTypes.string.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default Blog;
