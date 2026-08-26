"use client";

import { useState, type FormEvent } from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import type { useAuthSession } from "@/hooks/useAuthSession";
import { AUTH_ROLES, type AuthRole } from "@/types/auth";

type Props = {
  auth: ReturnType<typeof useAuthSession>;
};

export default function LoginForm({ auth }: Props) {
  const { activeRole, setActiveRole, session, login, logout, loading, error } = auth;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleRoleChange(_event: unknown, value: AuthRole | null) {
    if (value) {
      setActiveRole(value);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await login(email, password);
  }

  return (
    <Stack component="form" spacing={2.5} onSubmit={handleSubmit} noValidate>
      <div>
        <Typography variant="caption" color="text.secondary" sx={{ letterSpacing: "0.04em" }}>
          ROLE
        </Typography>
        <ToggleButtonGroup
          exclusive
          fullWidth
          size="small"
          value={activeRole}
          onChange={handleRoleChange}
          aria-label="Account role"
          sx={{ mt: 0.75 }}
        >
          {AUTH_ROLES.map((role) => (
            <ToggleButton key={role} value={role} aria-label={role}>
              {role}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>

      <TextField
        label="Email"
        type="email"
        name="email"
        autoComplete="username"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
        fullWidth
        size="small"
      />
      <TextField
        label="Password"
        type={showPassword ? "text" : "password"}
        name="password"
        autoComplete="current-password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
        fullWidth
        size="small"
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((open) => !open)}
                  onMouseDown={(event) => event.preventDefault()}
                  edge="end"
                  size="small"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      {error ? (
        <Alert severity="error" role="alert">
          {error}
        </Alert>
      ) : null}

      <Stack direction="row" spacing={1.5}>
        <Button type="submit" variant="contained" disabled={loading} fullWidth>
          {loading ? "Working…" : "Log in"}
        </Button>
        <Button
          type="button"
          variant="outlined"
          disabled={loading || !session}
          onClick={() => void logout()}
          fullWidth
        >
          Log out
        </Button>
      </Stack>

      <Stack
        spacing={0.5}
        sx={{
          border: 1,
          borderColor: "divider",
          borderRadius: 1,
          px: 1.5,
          py: 1.25,
        }}
      >
        <Typography variant="caption" color="text.secondary" sx={{ letterSpacing: "0.04em" }}>
          ACTIVE SESSION
        </Typography>
        <Typography variant="body2">Role: {activeRole}</Typography>
        <Typography variant="body2">
          Email: {session?.account.email ?? "—"}
        </Typography>
        <Typography variant="body2">
          Access token: {session ? "present" : "none"}
        </Typography>
      </Stack>
    </Stack>
  );
}
