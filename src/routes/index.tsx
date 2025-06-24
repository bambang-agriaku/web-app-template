import { createFileRoute, redirect } from "@tanstack/react-router";
import { fallback } from "./login";

export const Route = createFileRoute("/")({
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: fallback });
    }

    return redirect({ to: "/login" });
  },
});
