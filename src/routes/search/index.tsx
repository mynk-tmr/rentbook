import { Button, Input } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/search/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="container mx-auto p-4">
      <SearchForm />
    </main>
  );
}

function SearchForm() {
  return (
    <form className="flex gap-4">
      <Input
        type="search"
        id="search"
        placeholder="Search..."
        className="grow"
      />
      <Button type="submit" variant="light">
        Search
      </Button>
    </form>
  );
}
