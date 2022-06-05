import { Link } from "react-router-dom";
import Togglable from "../components/Togglable";
import BlogForm from "../components/BlogForm";

const BlogList = ({ blogs }) => {
  return (
    <>
      <Togglable buttonLabel="create new">
        <BlogForm />
      </Togglable>
      {blogs.map((blog) => (
        <div key={blog.id} className="blog">
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </div>
      ))}
    </>
  );
};

export default BlogList;
