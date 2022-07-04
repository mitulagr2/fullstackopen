import { useState, useEffect } from "react";
import { useApolloClient } from "@apollo/client";
import Authors from "./components/Authors";
import Books from "./components/Books";
import Recommendations from "./components/Recommendations";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [page, setPage] = useState("books");
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  useEffect(() => {
    if (!token || !localStorage.getItem("library-user-token")) {
      logout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    if (page === "add" || page === "recommended") {
      setPage("books");
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommended")}>recommended</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Notify errorMessage={errorMessage} />

      <Authors show={page === "authors"} token={token} setError={notify} />

      <Books show={page === "books"} notify={notify} client={client} />

      <Recommendations
        show={page === "recommended"}
        token={token}
        setPage={setPage}
      />

      <NewBook
        show={page === "add"}
        token={token}
        setError={notify}
        setPage={setPage}
        client={client}
      />

      <LoginForm
        show={page === "login"}
        token={token}
        setToken={setToken}
        setError={notify}
        setPage={setPage}
        client={client}
      />
    </div>
  );
};

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return <div style={{ color: "red" }}>{errorMessage}</div>;
};

export default App;
