import { createFileRoute } from "@tanstack/react-router";
import { ReadBookLanding } from "~/components/landing-page";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="h-screen grid place-items-center bg-zinc-200">
      <ReadBookLanding />
    </main>
  );
}
