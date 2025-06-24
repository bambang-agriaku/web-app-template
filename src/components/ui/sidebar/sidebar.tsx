import {
  Drawer,
  Divider,
  List,
  Box,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { ListItem } from "@/components/ui/sidebar";
import { resources } from "@/lib/resource";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "@/lib/auth";
import { useRouter, useNavigate } from "@tanstack/react-router";

const drawerWidth = 280;

const Sidebar = () => {
  const router = useRouter();
  const navigate = useNavigate();
  const auth = useAuth();

  const handleLogout = async () => {
    await auth.logout();
    await router.invalidate();
    navigate({ to: "/login", replace: true });
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          backgroundColor: "#F2F3F8",
          width: drawerWidth,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box sx={{ flex: 1 }}>
        <Box
          sx={{
            height: "90px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="https://placehold.co/300x200"
            alt="logo"
            style={{ width: "100px", height: "auto" }}
          />
        </Box>
        <List>
          {resources.map((resource) => (
            <ListItem key={resource.name} resource={resource} />
          ))}
        </List>
      </Box>
      <Divider />
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
            <Typography variant="title2">User</Typography>
            <Typography variant="text">Admin</Typography>
          </Stack>
          <IconButton
            onClick={handleLogout}
            sx={{ backgroundColor: "#F2F3F8", borderRadius: 1 }}
          >
            <LogoutIcon fontSize="small" color="error" />
          </IconButton>
        </Stack>
      </Box>
    </Drawer>
  );
};

export { Sidebar };
