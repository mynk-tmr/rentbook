import { Title } from "@mantine/core";
import { useLoaderData } from "@tanstack/react-router";
import { use } from "react";
import { BookResultsInner } from "./book-result-inner";
import { Paginator } from "./Paginator";

export function BookResultsPending() {
  const { dataPromise } = useLoaderData({
    from: "/search/",
  });

  const payload = use(dataPromise);
  if (payload.success && payload.data.books.length)
    return (
      <section
        ref={(ele) => {
          ele && ele.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <BookResultsInner books={payload.data.books} />
        <Paginator records={Number(payload.data.records)} />
      </section>
    );

  if (payload.success) return <Fallback>No results found</Fallback>;

  return <Fallback>Server Error. Search Again</Fallback>;
}

export function Fallback(props: { children: React.ReactNode }) {
  return (
    <Title className="text-center text-balance capitalize p-6">
      {props.children}
    </Title>
  );
}
