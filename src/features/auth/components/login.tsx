import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  Alert,
  Grid,
  useTheme,
} from "@mui/material";
import { useRouterState } from "@tanstack/react-router";
import { Route } from "@/routes/login";
import { useAuth } from "@/lib/auth";
import { env } from "@/config/env";

export const Login = () => {
  const theme = useTheme();
  const auth = useAuth();
  const { mutate: login } = auth.login;
  const isLoading = useRouterState({ select: (s) => s.isLoading });
  const search = Route.useSearch();

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const isLoggingIn = isLoading || isSubmitting;

  const onFormSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setIsSubmitting(true);

    const data = new FormData(evt.currentTarget);
    const username = data.get("username")?.toString();
    const password = data.get("password")?.toString();

    if (!username || !password) return;

    login(
      { data: { username, password } },
      {
        onSettled: () => {
          setIsSubmitting(false);
        },
      },
    );
  };

  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid
        size={{ xs: 0, md: 3 }}
        sx={{ backgroundColor: theme.palette.primary.main }}
      />
      <Grid
        size={{ xs: 12, md: 9 }}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          p: 4,
        }}
      >
        <Typography variant="header">{`Masuk Ke ${env.APP_NAME}`}</Typography>
        {search.redirect && (
          <Alert severity="warning">
            You need to login to access this page.
          </Alert>
        )}
        <Box
          component="form"
          onSubmit={onFormSubmit}
          sx={{ mt: 2, maxWidth: 400 }}
        >
          <fieldset
            disabled={isLoggingIn}
            style={{ border: "none", padding: 0 }}
          >
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
      </Grid>
    </Grid>
  );
};
