import { Login } from "@/features/auth/components/login";
import { createFileRoute, redirect } from "@tanstack/react-router";
import z from "zod";

export const fallback = "/products" as const;

export const Route = createFileRoute("/login")({
  component: Login,
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),
  beforeLoad: ({ context, search }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: search.redirect || fallback });
    }
  },
});
