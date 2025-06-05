import { load } from "cheerio/slim";
import type { SearchFilterDTO } from "~/dto/search-filter-dto";

const fields = [
  "title", //always keep title as first
  "author",
  "series",
  "publisher",
  "city",
  "year",
  "edition",
  "language",
  "pages",
  "isbn",
  "id",
  "added",
  "modified",
  "size",
  "extension",
] as const;

type Keys = (typeof fields)[number];
export type BookData = Record<Keys | "coverUrl" | "dlink", string>;

interface QueryLibgenOptions {
  forceOneExtension: true;
}

export async function queryLibgen(
  input: SearchFilterDTO,
  options?: QueryLibgenOptions
) {
  const url = new URLSearchParams({
    view: "detailed",
    phrase: "1",
    ...input,
  });
  const href = `https://libgen.is/search.php?${url.toString()}`;
  console.log("Fetching from", href);
  const res = await fetch(href, {
    mode: "cors",
  });
  const data = await res.text();
  let { books, records } = scrapPage(data);
  if (options?.forceOneExtension)
    books = books.filter((item, i) => item.isbn !== books[i - 1]?.isbn);
  return { books, records };
}

function scrapPage(data: string) {
  const $ = load(data);
  const books = new Array<BookData>();
  let records = $('font:icontains("files found")').text();
  records = records.match(/\d+/)?.at(0) || "0";
  if (records === "0") return { books, records };

  $('table[rules="cols"]').each((_, el) => {
    const result = {} as BookData;
    for (let field of fields) {
      result[field] = $(el).find(`td:icontains("${field}")`).next().text();
      if (result["title"].length < 1) return;
    }
    const img = $(el).find("img");
    result["coverUrl"] = "https://libgen.is" + img.attr("src");
    result["dlink"] = "https://libgen.is" + img.parent().attr("href");
    books.push(result);
  });

  return { books, records };
}
