import { createFileRoute, redirect } from "@tanstack/react-router";
import { fallback } from "./login";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    redirect({ to: fallback });
  },
});
