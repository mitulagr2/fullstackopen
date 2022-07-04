import { useState, useEffect } from "react";
import { useQuery, useSubscription } from "@apollo/client";
import { ALL_AUTHORS, ALL_BOOKS, ALL_GENRES, BOOK_ADDED } from "../queries";

const Books = ({ show, notify, client }) => {
  const [genre, setGenre] = useState("all");
  const getGenreList = useQuery(ALL_GENRES);
  const result = useQuery(ALL_BOOKS, {
    variables: { genre: genre === "all" ? "" : genre },
  });

  useEffect(() => {
    client.refetchQueries({
      include: [ALL_BOOKS],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genre, getGenreList]);

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({
      subscriptionData: {
        data: { bookAdded },
      },
    }) => {
      notify(`${bookAdded.title} added`);

      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        if (
          !allBooks.some(
            ({ author: { name } }) => name === bookAdded.author.name
          )
        ) {
          client.cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
            return {
              allAuthors: allAuthors.concat(bookAdded.author),
            };
          });
        }

        return {
          allBooks: allBooks.concat(bookAdded),
        };
      });

      client.cache.updateQuery({ query: ALL_GENRES }, ({ allGenres }) => {
        return {
          allGenres: new Set([...allGenres, ...bookAdded.genres]),
        };
      });
    },
  });

  if (!show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const books = result.data.allBooks;

  return (
    <div>
      <h2>books</h2>

      <p>
        in genre <strong>{genre}</strong>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {[...getGenreList.data.allGenres].map((g) => (
        <button key={g} onClick={() => setGenre(g)}>
          {g}
        </button>
      ))}
    </div>
  );
};

export default Books;
