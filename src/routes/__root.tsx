import { Text, Title } from "@mantine/core";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: RootComponent,
  errorComponent: ShowErrorUI,
});

function RootComponent() {
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}

function ShowErrorUI() {
  return (
    <main className="h-screen text-center space-y-10">
      <Title>Something went wrong</Title>
      <Text className="animate-pulse">
        <Link to="/" className="text-blue-700 font-bold">
          Go back home
        </Link>
      </Text>
    </main>
  );
}
