import { Link, useNavigate } from "react-router-dom";

const UserView = ({ user }) => {
  const navigate = useNavigate();

  if (!user) navigate("/");

  const getUserBlogs = () => {
    if (user.blogs.length) {
      return (
        <>
          <h4>added blogs</h4>
          <ul>
            {user.blogs.map((blog) => (
              <li key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </li>
            ))}
          </ul>
        </>
      );
    }
    return <p>user has not added any blogs yet.</p>;
  };

  return (
    <>
      <h2>{user.name}</h2>
      {getUserBlogs()}
    </>
  );
};

export default UserView;
