import { Toolbar, Drawer, Divider, List, Box, Button } from "@mui/material";
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
      <Box>
        <Toolbar />
        <Divider />
        <List>
          {resources.map((resource) => (
            <ListItem key={resource.name} resource={resource} />
          ))}
        </List>
      </Box>
      <Box sx={{ p: 2 }}>
        <Button
          variant="outlined"
          color="error"
          startIcon={<LogoutIcon />}
          fullWidth
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Drawer>
  );
};

export { Sidebar };
