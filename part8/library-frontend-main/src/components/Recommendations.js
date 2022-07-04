import { useQuery } from "@apollo/client";
import { ALL_BOOKS, CURRENT_USER } from "../queries";

const Recommendations = ({ show, token, setPage }) => {
  const getUser = useQuery(CURRENT_USER);
  const result = useQuery(ALL_BOOKS);

  if (!show) {
    return null;
  }

  if (!token) {
    setPage("books");
  }

  if (result.loading || getUser.loading) {
    return <div>loading...</div>;
  }

  const booksToShow = result.data.allBooks.filter(({ genres }) =>
    genres.includes(getUser.data.me.favouriteGenre)
  );

  return (
    <div>
      <h2>recommendations</h2>

      <p>
        books in your favourite genre{" "}
        <strong>{getUser.data.me.favouriteGenre}</strong>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendations;
