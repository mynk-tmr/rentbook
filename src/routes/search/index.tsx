import { Button, Pagination, Title } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { Suspense, use } from "react";
import { BookCard } from "~/components/book-card";
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
      <header>
        <Title p={10} ta="center" c="cyan">
          ReadBook
          <img
            src="./favicon.ico"
            alt="Butterfly"
            className="inline-block ml-3"
          />
        </Title>
      </header>
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
  if (payload.success && payload.data.books.length)
    return (
      <section
        ref={(ele) => {
          ele && ele.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <section className="grid xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6 mx-auto w-fit">
          {payload.data.books.map((book) => (
            <BookCard key={book.id + book.extension} {...book} />
          ))}
        </section>
        <section className="flex justify-center ">
          <Paginator records={Number(payload.data.records)} />
        </section>
      </section>
    );

  if (payload.success) return <Fallback>No results found</Fallback>;

  return <Fallback>Server Error. Search Again</Fallback>;
}

function Fallback(props: { children: React.ReactNode }) {
  return (
    <Title className="text-center text-balance capitalize p-6">
      {props.children}
    </Title>
  );
}

function Paginator(props: { records: number }) {
  const { res, page, ...others } = Route.useSearch();
  const goto = Route.useNavigate();
  return (
    <Pagination
      total={Math.ceil(props.records / Number(res))}
      value={Number(page)}
      onChange={(v) =>
        goto({
          search: { ...others, res, page: v },
        })
      }
    />
  );
}
