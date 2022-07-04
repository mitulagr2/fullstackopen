import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_BOOK } from "../queries";

const NewBook = ({ show, token, setError, setPage, client }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [createBook] = useMutation(CREATE_BOOK, {
    onError: (error) => {
      setError(error.graphQLErrors[0]?.message);
    },
    onCompleted: () => {
      setPage("books");
      setTitle("");
      setPublished("");
      setAuthor("");
      setGenres([]);
      setGenre("");
    },
  });

  if (!show) {
    return null;
  }

  if (!token) {
    setPage("books");
  }

  const submit = async (event) => {
    event.preventDefault();

    const variables = {
      author,
      genres,
      published: +published,
      title,
    };

    createBook({ variables });
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(", ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
