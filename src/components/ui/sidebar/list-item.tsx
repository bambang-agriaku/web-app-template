import type { Resource } from "@/lib/resource";
import {
  ListItem as MUIListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useState, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";

type Props = {
  resource: Resource;
};

const SidebarListItem = ({ resource }: Props) => {
  const { label, icon, path, children } = resource;
  const isParent = children && children.length > 0;

  return isParent ? (
    <ParentItem label={label} icon={icon} childrenItems={children} />
  ) : (
    <ChildItem label={label} icon={icon} path={path} />
  );
};

const ParentItem = ({
  label,
  icon,
  childrenItems,
}: {
  label: string;
  icon: ReactNode;
  childrenItems: Resource[];
}) => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);

  return (
    <>
      <ListItemButton onClick={toggle}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={label} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {childrenItems.map((child) => (
          <SidebarListItem key={child.name} resource={child} />
        ))}
      </Collapse>
    </>
  );
};

const ChildItem = ({
  label,
  icon,
  path,
}: {
  label: string;
  icon: ReactNode;
  path?: string;
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate({ to: path });
  };

  return (
    <MUIListItem component="div" disablePadding>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={label} />
      </ListItemButton>
    </MUIListItem>
  );
};

export { SidebarListItem as ListItem };
