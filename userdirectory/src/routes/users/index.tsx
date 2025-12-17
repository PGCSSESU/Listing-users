import { createFileRoute } from "@tanstack/react-router";
import UsersPage from "@/pages/UsersPages";

export const Route = createFileRoute("/users/")({
  component: UsersPage,
});
