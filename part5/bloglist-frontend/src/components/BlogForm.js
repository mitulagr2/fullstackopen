import React, { useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleAdd = (event) => {
    event.preventDefault();
    addBlog({ title, author, url });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <>
      <form onSubmit={handleAdd}>
        <div>
          title:
          <input
            id="title"
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            id="author"
            type="author"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            id="url"
            type="url"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="new-blog-button" type="submit">
          create
        </button>
      </form>
    </>
  );
};

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
};

export default BlogForm;
