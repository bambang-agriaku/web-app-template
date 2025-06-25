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
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";

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
  const location = useRouterState({ select: (s) => s.location.pathname });

  const isChildPathMatch = useMemo(() => {
    return childrenItems.some(
      (child) => child.path && location.startsWith(child.path),
    );
  }, [childrenItems, location]);

  const [open, setOpen] = useState(isChildPathMatch);

  useEffect(() => {
    if (isChildPathMatch) {
      setOpen(true);
    }
  }, [isChildPathMatch]);

  const toggle = () => setOpen((prev) => !prev);

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
  const location = useRouterState({ select: (s) => s.location.pathname });

  const handleClick = () => {
    if (path) {
      navigate({ to: path });
    }
  };

  const isSelected = path === location;

  return (
    <MUIListItem component="div" disablePadding>
      <ListItemButton onClick={handleClick} selected={isSelected}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={label} />
      </ListItemButton>
    </MUIListItem>
  );
};

export { SidebarListItem as ListItem };
