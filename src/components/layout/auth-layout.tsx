import { useAuth } from "@/lib/auth";
import { Route } from "@/routes/_auth";
import { Box } from "@mui/material";
import { useRouter } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Sidebar } from "@/components/ui/sidebar";

type Props = {
  children: ReactNode;
};

export const AuthLayout = ({ children }: Props) => {
  const router = useRouter();
  const navigate = Route.useNavigate();
  const auth = useAuth();

  const handleLogout = async () => {
    await auth.logout();
    await router.invalidate();
    navigate({ to: "/login", replace: true });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 5 }}
      >
        {children}
      </Box>
    </Box>
  );
};
