import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";
import Select from "react-select";

const Authors = ({ show, token, setError }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [born, setBorn] = useState("");
  const result = useQuery(ALL_AUTHORS);

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    onError: (error) => {
      setError(error.graphQLErrors[0]?.message);
    },
    update: (cache, { data: { editAuthor } }) => {
      setBorn("");

      cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
        return {
          allAuthors: allAuthors.map((a) =>
            a.name === editAuthor.name ? editAuthor : a
          ),
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

  const authors = result.data.allAuthors;
  const options = authors.map(({ name }) => ({ value: name, label: name }));

  const submit = async (event) => {
    event.preventDefault();

    const variables = {
      name: selectedOption.value,
      born: +born,
    };
    editAuthor({ variables });
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {token && (
        <>
          <h2>Set birthyear</h2>
          <form onSubmit={submit}>
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
            />
            <div>
              born
              <input
                value={born}
                onChange={({ target }) => setBorn(target.value)}
              />
            </div>
            <button type="submit">update author</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Authors;
