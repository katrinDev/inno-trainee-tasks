import AuthContainer from "../layout/AuthContainer";
import { AuthMainBox, SignInForm, StyledLink } from "../signIn/SignIn";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { PROJECTS, SIGN_IN } from "../../router/paths";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../state/store";
import { setSnackbarProps } from "../../state/snackbar/snackbarSlice";
import * as AuthService from "../../services/AuthService";

export type SignUpForm = SignInForm & {
  fullName: string;
  confirmPassword: string;
};

export default function SignUp() {
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors, isSubmitSuccessful },
  } = useForm<SignUpForm>();

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful]);

  const signUpSubmit: SubmitHandler<SignUpForm> = async (formData) => {
    if (Object.keys(errors).length === 0) {
      const { data, error } = await AuthService.signUp(formData);

      if (error) {
        dispatch(
          setSnackbarProps({
            severity: "error",
            text: error.message,
          })
        );
      } else {
        dispatch(
          setSnackbarProps({
            severity: "success",
            text: `User ${data.user?.user_metadata.full_name} registered successfully!`,
          })
        );
        navigate(PROJECTS);
      }
    }
  };

  return (
    <AuthContainer>
      <AuthMainBox>
        <Avatar sx={{ m: 1, bgcolor: "error.light" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(signUpSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="fullName"
            label="Full Name"
            autoComplete="full-name"
            autoFocus
            {...register("fullName", {
              required: "Required field",
              maxLength: {
                value: 40,
                message: "Fullname is too long",
              },
            })}
            error={!!errors.fullName}
            helperText={errors.fullName ? errors.fullName.message : null}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            autoComplete="email"
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
            autoComplete="new-password"
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
          <TextField
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            error={!!errors.confirmPassword}
            {...register("confirmPassword", {
              required: "Обязательное поле",
              validate: (value) =>
                value === watch("password") || "Passwords aren't equal",
            })}
            helperText={
              errors.confirmPassword ? errors.confirmPassword.message : null
            }
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
        <StyledLink to={SIGN_IN}>
          {"Already have an account? Sign In"}
        </StyledLink>
      </AuthMainBox>
    </AuthContainer>
  );
}
