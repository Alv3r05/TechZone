import { useState } from "react";
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

import { register } from "../features/auth/services/authService";
import { useAppDispatch } from "../store/reduxHooks";
import { loginUser } from "../features/auth/authSlice";
import { ROUTES } from "../routes/paths";

const Register = (): React.ReactElement => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (): Promise<void> => {
    setError("");

    if (name.trim().length < 15) {
      setError("Full name must be at least 15 characters long.");
      return;
    }

    if (username.trim().length < 10) {
      setError("Username must be at least 10 characters long.");
      return;
    }

    if (password.trim().length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);

    try {
      const result = await register({
        name,
        username,
        email,
        password,
      });

      dispatch(loginUser(result));

      navigate(ROUTES.HOME);
    } catch (err: unknown) {
      if (err instanceof AxiosError && err.response?.data?.message) {
        setError(err.response.data.message as string);
      } else {
        setError("Unable to create the account.");
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
          sx={{ mb: 1, fontWeight: "bold", color: "text.primary" }}
        >
          Create account
        </Typography>

        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Sign up for TechZone
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box>
          <TextField
            fullWidth
            label="Full name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            margin="normal"
            required
            helperText="Minimum 15 characters"
          />

          <TextField
            fullWidth
            label="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            margin="normal"
            required
            helperText="Minimum 10 characters"
          />

          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
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
            helperText="Minimum 8 characters"
          />

          <Button
            variant="contained"
            fullWidth
            size="large"
            disabled={loading}
            onClick={handleRegister}
            sx={{ mt: 3 }}
          >
            {loading ? "Creating account..." : "Create account"}
          </Button>
        </Box>

        <Typography align="center" sx={{ mt: 3 }}>
          Already have an account?{" "}
          <Button onClick={() => navigate(ROUTES.LOGIN)}>Sign in</Button>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Register;
