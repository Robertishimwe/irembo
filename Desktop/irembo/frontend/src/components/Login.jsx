import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Copyright from "../components/Copyright";
import { toast } from "react-toastify";
import { Link,useLocation } from "react-router-dom";

import { useDispatch } from "react-redux";
import { logginUser } from "../redux/features/auth/loginSlice";
import { loginMode } from "../redux/features/auth/isLoggedSlice";
import jwtDecode from "jwt-decode";
import api from "../utils/api";

const theme = createTheme();

export default function Login() {
  const dispatch = useDispatch();
  const location = useLocation();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  
    const email = data.get("email");
    const password = data.get("password");
  
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!emailRegex.test(email)) {
      return toast.error("Please enter a valid email address", {
        position: "bottom-right",
        autoClose: 5000,
      });
    }
  
    if (!password) {
      return toast.error("Password cannot be empty", {
        position: "bottom-right",
        autoClose: 5000,
      });
    }
  
    api
      .post(`/auth/login`, {
        email,
        password,
      })
      .then((res) => {
        const token = res.data.data;
        console.log(res.data.data);
        if (token.isMfaEnabled == true) {
          return toast.success("Login link was sent to your email", {
            position: "bottom-right",
            autoClose: 5000,
          });
        } else {
          const decoded = jwtDecode(token);
          localStorage.setItem("token", token);
          localStorage.setItem("loggedUser", JSON.stringify(decoded));
  
          dispatch(logginUser(decoded));
          dispatch(loginMode());
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          err?.response?.data.error
            ? err?.response?.data.error
            : err?.response?.data.message,
          {
            position: "bottom-right",
            autoClose: 5000,
          }
        );
      })
      .finally(() => {
        // Force page refresh
        location.reload();
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
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
                <Link to="/forgot-password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
