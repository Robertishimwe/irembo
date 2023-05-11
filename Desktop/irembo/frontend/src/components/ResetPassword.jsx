
import { useState } from "react";

// other imports...
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
import { toast } from "react-toastify";
import { Link, useParams,  useNavigate } from "react-router-dom";

import api from "../utils/api";
const theme = createTheme();

export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const {token} = useParams();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget);

    const password = data.get("password");

    setIsLoading(true);

    api
      .post(`/auth/reset-password`, {
        password,
        token,
      })
      .then((res) => {
        console.log(res.data.data);
        toast.success(
          "password reset successfully",
          {
            position: "bottom-right",
            autoClose: 5000,
          }
          // redirect to login page after 5 seconds
          
          
        );
        setTimeout(() => {
          navigate("/login");
        }, 5000);

      })
      .catch((err) => {
        console.log(err.response.data.message);
        toast.error((err?.response?.data?.message) ? err?.response?.data.message : err?.response?.data.message, {
          position:'bottom-right',
          autoClose: 5000,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        {/* other code... */}
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
            Reset Password
          </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {/* other code... */}
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
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Send reset link"}
          </Button>
          {/* other code... */}
          <Grid container>
              <Grid item xs>
                <Link to="/login" variant="body2">
                  {/* Login */}
                </Link>
              </Grid>
              <Grid item>
                <Link to="/login" variant="body2">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
