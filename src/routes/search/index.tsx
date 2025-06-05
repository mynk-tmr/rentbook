import { Button, Title } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { Suspense, use } from "react";
import { BookCard } from "~/components/book-component";
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
      <Suspense
        fallback={
          <Fallback>
            Loading <Button loading variant="subtle" radius="lg" />{" "}
          </Fallback>
        }
      >
        <Results />
      </Suspense>
    </>
  );
}

function Results() {
  const { dataPromise } = Route.useLoaderData();
  const payload = use(dataPromise);
  if (payload.success && payload.data.length)
    return (
      <section className="grid xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6 mx-auto w-fit">
        {payload.data.map((book) => (
          <BookCard {...book} />
        ))}
      </section>
    );

  if (payload.success) return <Fallback>No results found</Fallback>;

  return <Fallback>Server Error. Search Again</Fallback>;
}

function Fallback(props: { children: React.ReactNode }) {
  return (
    <Title className="w-fit mx-auto text-balance capitalize p-6">
      {props.children}
    </Title>
  );
}
