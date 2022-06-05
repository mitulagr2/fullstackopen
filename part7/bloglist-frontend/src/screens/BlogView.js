import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { likeBlog, deleteBlog } from "../reducers/blogReducer";

const BlogView = ({ blog, curUser }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!blog) navigate("/");

  const handleLike = () => {
    dispatch(likeBlog(blog.id));
  };

  const handleDelete = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog.id));
      navigate("/");
    }
  };

  return (
    <>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <p>
        <a href={blog.url}>{blog.url}</a>
        <br />
        {blog.likes} likes <button onClick={handleLike}> like </button>
        <br />
        added by <Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link>
        <br />
        {blog.user.username === curUser.username && (
          <button onClick={handleDelete}> remove </button>
        )}
      </p>
    </>
  );
};

export default BlogView;
