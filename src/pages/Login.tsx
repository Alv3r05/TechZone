import { useState } from "react";
import type { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { login } from "../features/auth/services/authService";
import { useAppDispatch } from "../store/reduxHooks";
import { loginUser } from "../features/auth/authSlice";
import { ROUTES } from "../routes/paths";

const Login = (): ReactElement => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (): Promise<void> => {
    setError("");
    setLoading(true);

    try {
      const result = await login({
        username,
        password,
      });

      dispatch(loginUser(result));

      navigate(ROUTES.HOME);
    } catch (err: unknown) {
      if (err instanceof AxiosError && err.response?.data?.message) {
        setError(err.response.data.message as string);
      } else {
        setError("Unable to sign in.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{ mb: 1, fontWeight: "bold", color: "text.primary" }}
        >
          Sign in
        </Typography>

        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Access your TechZone account
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={(event) => {
            event.preventDefault();
            void handleSubmit();
          }}
        >
          <TextField
            fullWidth
            label="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            margin="normal"
            required
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={loading}
            sx={{ mt: 3 }}
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </Box>

        <Typography align="center" sx={{ mt: 3 }}>
          Don't have an account?{" "}
          <Button onClick={() => navigate(ROUTES.REGISTER)}>Sign up</Button>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
