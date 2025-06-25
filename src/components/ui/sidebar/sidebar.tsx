import { Drawer, Divider, List, Box } from "@mui/material";
import { ListItem } from "@/components/ui/sidebar";
import { resources } from "@/lib/resource";
import { Profile } from "./profile";

const drawerWidth = 280;

const Sidebar = () => {
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
      <Profile />
    </Drawer>
  );
};

export { Sidebar };
