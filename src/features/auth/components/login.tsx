import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useRouter, useRouterState } from "@tanstack/react-router";
import { fallback, Route } from "@/routes/login";
import { useAuth } from "@/lib/auth";

export const Login = () => {
  const auth = useAuth();
  const router = useRouter();
  const isLoading = useRouterState({ select: (s) => s.isLoading });
  const navigate = Route.useNavigate();
  const search = Route.useSearch();

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const isLoggingIn = isLoading || isSubmitting;

  const onFormSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setIsSubmitting(true);

    try {
      const data = new FormData(evt.currentTarget);
      const username = data.get("username")?.toString();
      const password = data.get("password")?.toString();

      if (!username || !password) return;

      await auth.login(username); // You may want to pass password too if needed
      await router.invalidate();
      await navigate({ to: search.redirect || fallback });
    } catch (error) {
      console.error("Error logging in: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      display="grid"
      justifyContent="center"
      alignItems="center"
      padding={2}
      gap={2}
    >
      <Typography variant="h5">Login Page</Typography>

      {search.redirect ? (
        <Alert severity="warning">You need to login to access this page.</Alert>
      ) : (
        <Typography>Login to see all the cool content in here.</Typography>
      )}

      <Box
        component="form"
        onSubmit={onFormSubmit}
        sx={{ mt: 2, maxWidth: 400 }}
      >
        <fieldset disabled={isLoggingIn} style={{ border: "none", padding: 0 }}>
          <Box display="grid" gap={2}>
            <TextField
              id="username-input"
              name="username"
              label="Username"
              placeholder="Enter your name"
              fullWidth
              required
            />
            <TextField
              id="password-input"
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
              fullWidth
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isLoggingIn}
              startIcon={isLoggingIn ? <CircularProgress size={20} /> : null}
            >
              {isLoggingIn ? "Logging in..." : "Login"}
            </Button>
          </Box>
        </fieldset>
      </Box>
    </Box>
  );
};
