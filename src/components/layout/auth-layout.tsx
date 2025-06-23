import { useAuth } from "@/lib/auth";
import { Route } from "@/routes/_auth";
import { Button } from "@mui/material";
import { useRouter, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

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
    <>
      <div>
        <Link to="/products">Products</Link> <Link to="/recipes">Recipes</Link>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
      <hr />
      {children}
    </>
  );
};
