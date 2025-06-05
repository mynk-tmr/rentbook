import { Pagination } from "@mantine/core";
import { useNavigate, useSearch } from "@tanstack/react-router";

export function Paginator(props: { records: number }) {
  const { res, page, ...others } = useSearch({
    from: "/search/",
  });
  const goto = useNavigate({
    from: "/search",
  });
  return (
    <section className="flex justify-center py-10">
      <Pagination
        total={Math.ceil(props.records / Number(res))}
        value={Number(page)}
        onChange={(v) =>
          goto({
            search: { ...others, res, page: v },
          })
        }
      />
    </section>
  );
}
