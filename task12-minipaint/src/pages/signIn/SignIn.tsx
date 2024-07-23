import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { styled } from "@mui/material/styles";
import AuthContainer from "../layout/AuthContainer";
import { PROJECTS, SIGN_UP } from "../../router/paths";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../state/store";
import { setSnackbarProps } from "../../state/snackbar/snackbarSlice";
import AuthService from "../../services/AuthService";
import Spinner from "../../components/utils/Spinner";

export const AuthMainBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(10),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

export const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: "0.9rem",
  "&:hover": {
    color: theme.palette.primary.dark,
  },
}));

export type SignInForm = {
  email: string;
  password: string;
};

export default function SignIn() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<SignInForm>();

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const signInSubmit: SubmitHandler<SignInForm> = async (formData, event) => {
    event?.preventDefault();
    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      const { data, error } = await AuthService.signIn(formData);

      setIsLoading(false);
      if (error) {
        dispatch(
          setSnackbarProps({
            severity: "error",
            text: error.message,
          })
        );
      } else {
        navigate(PROJECTS);
        dispatch(
          setSnackbarProps({
            severity: "success",
            text: `Welcome, ${data.user.user_metadata.full_name}`,
          })
        );
      }
    }
  };

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful]);

  if (isLoading) {
    return <Spinner />;
  } else {
    return (
      <AuthContainer>
        <AuthMainBox>
          <Avatar sx={{ m: 1, bgcolor: "error.light" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(signInSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              autoComplete="email"
              autoFocus
              error={!!errors.email}
              {...register("email", {
                required: "Required field",
                pattern: {
                  value: /[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/,
                  message: "Incorrect mail format",
                },
              })}
              helperText={errors.email ? errors.email.message : null}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={!!errors.password}
              {...register("password", {
                required: "Required field",
                minLength: { value: 5, message: "Password is too short" },
                maxLength: {
                  value: 20,
                  message: "Password is too long",
                },
              })}
              helperText={errors.password ? errors.password.message : null}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
          <StyledLink to={SIGN_UP}>
            {"Don't have an account? Sign Up"}
          </StyledLink>
        </AuthMainBox>
      </AuthContainer>
    );
  }
}
