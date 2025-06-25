import { createFileRoute, redirect } from "@tanstack/react-router";
import { fallback } from "./login";
import { paths } from "@/config/paths";

export const Route = createFileRoute("/")({
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: fallback });
    }

    return redirect({ to: paths.auth.login.path });
  },
});
