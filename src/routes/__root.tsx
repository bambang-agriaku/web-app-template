import type { AuthContext } from "@/auth";
import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";
// import type { QueryClient } from "@tanstack/react-query";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

type RouterContext = {
  // queryClient: QueryClient;
  auth: AuthContext;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <div>
        <Link to="/">Home</Link> <Link to="/about">About</Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
