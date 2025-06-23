import { Toolbar, Drawer, Divider, List } from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { ListItem } from "@/components/ui/sidebar";
import { resources } from "@/lib/resource";

const drawerWidth = 280;

const Sidebar = () => {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <Divider />
      <List>
        {resources.map((resource) => (
          <ListItem key={resource.name} resource={resource} />
        ))}
      </List>
    </Drawer>
  );
};

export { Sidebar };
