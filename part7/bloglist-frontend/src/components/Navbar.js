import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../reducers/userReducer";

import { AppBar, Toolbar, Button, Grid } from "@material-ui/core";

const Navbar = ({ name }) => {
  const dispatch = useDispatch();

  if (!name) return null;

  return (
    <>
      <h2>blogs</h2>
      <AppBar position="static">
        <Toolbar>
          <Grid justifyContent="space-between" container>
            <Grid item>
              <Button color="inherit" component={Link} to="/blogs">
                blogs
              </Button>
              <Button color="inherit" component={Link} to="/users">
                users
              </Button>
            </Grid>
            <Grid item>
              {name} logged in{" "}
              <Button color="inherit" onClick={() => dispatch(logout())}>
                logout
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
