import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AuthLayout } from "@/components/layout/auth-layout";
import { paths } from "@/config/paths";

export const Route = createFileRoute("/_auth")({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: paths.auth.login.path,
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: Auth,
});

function Auth() {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
}
