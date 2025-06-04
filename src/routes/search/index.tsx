import { Code, Title } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { Suspense, use } from "react";
import { SearchFilterUI } from "~/components/search-filter";
import { Api } from "~/config";
import { SearchFilterSchema } from "~/dto/search-filter-dto";

export const Route = createFileRoute("/search/")({
  component: RouteComponent,
  validateSearch: zodValidator(SearchFilterSchema),
  loaderDeps({ search }) {
    return { search };
  },
  loader({ deps }) {
    const dataPromise = Api.libgen(deps.search);
    return { dataPromise };
  },
});

function RouteComponent() {
  return (
    <>
      <SearchFilterUI />
      <Suspense fallback={<Title className="w-fit mx-auto">Loading ...</Title>}>
        <Results />
      </Suspense>
    </>
  );
}

function Results() {
  const { dataPromise } = Route.useLoaderData();
  const data = use(dataPromise);
  return <Code block>{JSON.stringify(data, null, 2)}</Code>;
}
