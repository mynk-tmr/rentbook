import { MantineProvider } from "@mantine/core";
import { Router } from "./router";

export function App() {
  return (
    <MantineProvider>
      <Router />
    </MantineProvider>
  );
}
