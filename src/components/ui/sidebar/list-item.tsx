import type { Resource } from "@/lib/resource";
import {
  ListItem as MUIListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "@tanstack/react-router";

type Props = {
  resource: Resource;
};

const ListItem = ({ resource }: Props) => {
  const { label, icon, path } = resource;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate({
      to: path,
    });
  };

  return (
    <MUIListItem disablePadding>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={label} />
      </ListItemButton>
    </MUIListItem>
  );
};

export { ListItem };
