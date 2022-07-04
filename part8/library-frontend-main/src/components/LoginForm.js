import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { CURRENT_USER, LOGIN } from "../queries";

const LoginForm = ({ show, token, setToken, setError, setPage, client }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
    onCompleted: () => {
      setPage("books");
      setUsername("");
      setPassword("");
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("library-user-token", token);
      client.refetchQueries({
        include: [CURRENT_USER],
      });
    }
  }, [result.data]); // eslint-disable-line

  if (!show) {
    return null;
  }

  if (token) {
    setPage("books");
  }

  const submit = async (event) => {
    event.preventDefault();
    login({ variables: { username, password } });
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username{" "}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{" "}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
