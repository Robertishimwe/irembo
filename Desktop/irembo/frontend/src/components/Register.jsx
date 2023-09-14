import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateField } from "@mui/x-date-pickers/DateField";
import { toast } from "react-toastify";

import { Link, useNavigate } from "react-router-dom";

import Copyright from "../components/Copyright";

import api from "../utils/api";

const theme = createTheme();

export default function Register() {
  const navigate = useNavigate();

  const genderOptions = [
    {
      value: "MALE",
      label: "MALE",
    },
    {
      value: "FEMALE",
      label: "FEMALE",
    },
  ];
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   api
  //     .post(`/user/create`, {
  //       email: data.get("email"),
  //       password: data.get("password"),
  //       firstName: data.get("firstName"),
  //       lastName: data.get("lastName"),
  //       gender: data.get("gender"),
  //       dateOfBirth: data.get("dob"),
  //     })
  //     .then((res) => {
  //       console.log(res);

  //       toast.success(
  //         "account created successful. you are going to be redirected to login page",
  //         {
  //           position: "bottom-right",
  //           autoClose: 4000,
  //         }
  //       );
  //       setTimeout(() => {
  //         navigate("/login");
  //       }, 4000);
  //     })
  //     .catch((err) => {
  //       toast.error(
  //         err?.response?.data.error
  //           ? err?.response?.data.error
  //           : err?.response?.data.message,
  //         {
  //           position: "bottom-right",
  //           autoClose: 5000,
  //         }
  //       );
  //     });
  // };


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const firstName = data.get("firstName");
    const lastName = data.get("lastName");
    const gender = data.get("gender");
    const email = data.get("email");
    const password = data.get("password");
    const dateOfBirth = data.get("dob");
  
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // Regular expression for password validation (at least one uppercase letter, one digit, and one special character)
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#*&]+)[\w@#*&]{8,}$/;
  
    // Regular expression for date of birth in MM/DD/YYYY format
    const dateOfBirthRegex = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
  
    if (firstName.length < 3) {
      return toast.error("First Name should be at least 3 characters long", {
        position: "bottom-right",
        autoClose: 5000,
      });
    }
  
    if (lastName.length < 3) {
      return toast.error("Last Name should be at least 3 characters long", {
        position: "bottom-right",
        autoClose: 5000,
      });
    }
  
    if (!genderOptions.some((option) => option.value === gender)) {
      return toast.error("Please select a valid gender", {
        position: "bottom-right",
        autoClose: 5000,
      });
    }
  
    if (!emailRegex.test(email)) {
      return toast.error("Please enter a valid email address", {
        position: "bottom-right",
        autoClose: 5000,
      });
    }
  
    if (!passwordRegex.test(password)) {
      return toast.error(
        "Password should contain at least one uppercase letter, one digit, and one special character, and be at least 8 characters long",
        {
          position: "bottom-right",
          autoClose: 5000,
        }
      );
    }
  
    if (!dateOfBirthRegex.test(dateOfBirth)) {
      return toast.error("Please enter a valid date of birth (MM/DD/YYYY)", {
        position: "bottom-right",
        autoClose: 5000,
      });
    }
  
    // If all validations pass, proceed with API call
    api
      .post(`/user/create`, {
        email,
        password,
        firstName,
        lastName,
        gender,
        dateOfBirth,
      })
      .then((res) => {
        console.log(res);
  
        toast.success(
          "Account created successfully. You will be redirected to the login page",
          {
            position: "bottom-right",
            autoClose: 4000,
          }
        );
        setTimeout(() => {
          navigate("/login");
        }, 4000);
      })
      .catch((err) => {
        toast.error(
          err?.response?.data.error
            ? err?.response?.data.error
            : err?.response?.data.message,
          {
            position: "bottom-right",
            autoClose: 5000,
          }
        );
      });
  };
  



  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateField"]}>
                    <DateField
                      label="Date of Birth"
                      name="dob"
                      id="dob"
                      fullWidth
                      sx={{ top: -8 }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="gender"
                  select
                  name="gender"
                  required
                  fullWidth
                  id="gender"
                  label="Gender"
                  autoFocus
                >
                  {genderOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
