import { useField } from "../hooks";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../reducers/userReducer";

import { TextField, Button } from "@material-ui/core";

const Login = () => {
  const username = useField("text");
  const password = useField("text");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    const credentials = {
      username: username.inputParams.value,
      password: password.inputParams.value,
    };
    dispatch(login(credentials));
    navigate("/");
  };

  return (
    <>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            label="username"
            id="username"
            name="Username"
            {...username.inputParams}
          />
        </div>
        <div>
          <TextField
            label="password"
            id="password"
            name="Password"
            type="password"
            value={password.inputParams.value}
            onChange={password.inputParams.onChange}
          />
        </div>
        <Button
          id="login-button"
          variant="contained"
          color="primary"
          type="submit"
        >
          login
        </Button>
      </form>
    </>
  );
};

export default Login;
