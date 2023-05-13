import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useParams, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { logginUser } from "../redux/features/auth/loginSlice";
import { loginMode } from "../redux/features/auth/isLoggedSlice";
import jwtDecode from "jwt-decode";
import api from "../utils/api";

const theme = createTheme();

export default function Login2fa() {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loginWithToken = async () => {
      try {
        const res = await api.post(`/auth/login-with-token`, {
          token,
        });

        const token = res.data.data;
        const decoded = jwtDecode(token);
        localStorage.setItem("token", token);
        localStorage.setItem("loggedUser", JSON.stringify(decoded));

        dispatch(logginUser(decoded));
        dispatch(loginMode());

        setLoading(false);
      } catch (err) {
        console.log(err);
       

        setLoading(false);
        setError(true);

        setTimeout(() => {
          navigate("/login");
        }, 4000);
      }
    };

    loginWithToken();
  }, [token, dispatch, navigate]);

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <CircularProgress size={60} thickness={4} />
        </Container>
      </ThemeProvider>
    );
  }

  if (error) {
    return (
      <ThemeProvider theme={theme}>
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <h1>Something went wrong, please try again later.</h1>
        </Container>
      </ThemeProvider>
    );
  }

  return null; // Render nothing while waiting for the response
}
