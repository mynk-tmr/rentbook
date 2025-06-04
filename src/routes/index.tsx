import { Button } from "@mantine/core";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Link to="/search" tabIndex={-1}>
      <Button variant="subtle">Go to search page</Button>
    </Link>
  );
}
