import { Box } from "@mui/material";
import type { ReactNode } from "react";
import { Sidebar } from "@/components/ui/sidebar";

type Props = {
  children: ReactNode;
};

export const AuthLayout = ({ children }: Props) => (
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
