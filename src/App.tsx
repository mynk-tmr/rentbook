import { Suspense, use } from "react";
import { apiUrl } from "./config";

const data = fetch(apiUrl)
  .then((res) => res.text())
  .catch((err) => err.message);

export default function App() {
  return (
    <Suspense fallback="loading ...">
      <Text />
    </Suspense>
  );
}

function Text() {
  const text = use(data);
  return <div>{text}</div>;
}
