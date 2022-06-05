import { useField } from "../hooks";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";

const BlogForm = ({ toggleVisibility }) => {
  const title = useField("text");
  const author = useField("text");
  const url = useField("text");
  const dispatch = useDispatch();

  const handleAdd = (event) => {
    event.preventDefault();
    const newBlog = {
      title: title.inputParams.value,
      author: author.inputParams.value,
      url: url.inputParams.value,
    };

    dispatch(createBlog(newBlog));
    toggleVisibility();
    title.reset();
    author.reset();
    url.reset();
  };

  return (
    <>
      <form onSubmit={handleAdd}>
        <div>
          title:
          <input id="title" name="Title" {...title.inputParams} />
        </div>
        <div>
          author:
          <input id="author" name="Author" {...author.inputParams} />
        </div>
        <div>
          url:
          <input id="url" name="Url" {...url.inputParams} />
        </div>
        <button id="new-blog-button" type="submit">
          create
        </button>
      </form>
    </>
  );
};

export default BlogForm;
