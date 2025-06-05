import { LoadingOverlay, Title } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { Suspense } from "react";
import { BookResultsPending } from "~/components/book-results";
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
  staleTime: 8640000,
});

function RouteComponent() {
  return (
    <>
      <Header />
      <SearchFilterUI />
      <Suspense
        fallback={
          <LoadingOverlay
            visible={true}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 1 }}
          />
        }
      >
        <BookResultsPending />
      </Suspense>
    </>
  );
}

function Header() {
  return (
    <header>
      <Title p={10} ta="center">
        ReadBook
        <img
          src="./favicon.ico"
          alt="Butterfly"
          className="inline-block ml-3"
        />
      </Title>
    </header>
  );
}
