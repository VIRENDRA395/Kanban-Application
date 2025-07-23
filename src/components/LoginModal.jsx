import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DataContext } from "../hooks/DataContext";
import { authenticate } from "../api/board-web-storage-api";
import User from "../model/User";
import Logo from "./Logo";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
  Snackbar,
} from "@mui/joy";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Backdrop, CircularProgress, ListItemAvatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { saveUser } from "../api/board-local-storage-api";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="http://slimani-ce.github.io/">
        Mustapha SLIMANI
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function LoginModal() {
  const navigate = useNavigate();
  const { user, setUser, setIsAuthenticated } = React.useContext(DataContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const [userNotFound, setUserNotFound] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
      rememberMe: data.get("remember"),
    });

    // Fetch user data
    setIsLoading(true);
    setUserNotFound(false);
    authenticate(data.get("email"), data.get("password"))
      .then((u) => {
        if (u) {
          setUser(User.fromJson(u));
          setIsAuthenticated(true);
          // Save user in local storage if remember me is checked
          if (data.get("remember")) {
            saveUser({
              password: data.get("password"),
              username: data.get("email"),
            });
          }
          // Navigate to home
          navigate("/");
        }
      })
      .catch((e) => {
        console.error(e);
        setUserNotFound(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <React.Fragment>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={userNotFound}
        color={"danger"}
        size={"lg"}
        startDecorator={<ErrorOutlineIcon />}
        endDecorator={
          <Button
            onClick={() => setUserNotFound(false)}
            size="sm"
            variant="soft"
            color="success"
          >
            Dismiss
          </Button>
        }
      >
        Email or password is incorrect
      </Snackbar>
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                "url(https://source.unsplash.com/random?wallpapers)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "24px",
                  marginBottom: "24px",
                }}
              >
                <Logo />
                <p>
                  Kanban is a project management and collaboration tool. It
                  helps you to visualize your work and maximize the efficiency
                  of your team.
                </p>
              </div>
              <Avatar sx={{ m: 1, bgcolor: "var(--main-purple)" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={
                    <Checkbox value="true" name="remember" color="primary" />
                  }
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    {/* <Link href="#" variant="body2">
                    Forgot password?
                  </Link> */}
                  </Grid>
                  <Grid item>
                    <Link href="/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </React.Fragment>
  );
}
