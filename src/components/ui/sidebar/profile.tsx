import { useAuth } from "@/lib/auth";
import {
  Box,
  Stack,
  Typography,
  IconButton,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useRouter, useNavigate } from "@tanstack/react-router";
import LogoutIcon from "@mui/icons-material/Logout";
import { useUser } from "@/features/auth/api/me";
import { paths } from "@/config/paths";

const Profile = () => {
  const router = useRouter();
  const navigate = useNavigate();
  const auth = useAuth();
  const userQuery = useUser();
  const { data: user, isLoading, error } = userQuery;

  const handleLogout = async () => {
    auth.logout();
    await router.invalidate();
    navigate({ to: paths.auth.login.path, replace: true });
  };

  return (
    <Box p={3}>
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "white",
          p: 1.5,
          borderRadius: 2,
          border: `1px solid #E1E2EA`,
        }}
      >
        <Stack>
          {isLoading ? (
            <CircularProgress size={20} />
          ) : error || !user ? (
            <Alert severity="error" sx={{ p: 0.5 }}>
              Failed to load user
            </Alert>
          ) : (
            <>
              <Typography variant="title2">{`${user.firstName} ${user.lastName}`}</Typography>
              <Typography variant="text">{user.role}</Typography>
            </>
          )}
        </Stack>
        <IconButton
          onClick={handleLogout}
          sx={{ backgroundColor: "#F2F3F8", borderRadius: 1 }}
        >
          <LogoutIcon fontSize="small" color="error" />
        </IconButton>
      </Stack>
    </Box>
  );
};

export { Profile };
