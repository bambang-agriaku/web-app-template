import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
  useRouter,
} from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { Button } from "@mui/material";

export const Route = createFileRoute("/_auth")({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: AuthLayout,
});

function AuthLayout() {
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
        <Link to="/">Home</Link> <Link to="/about">About</Link>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
      <hr />
      <Outlet />
    </>
  );
}
