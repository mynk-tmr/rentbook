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
export type QueryLibgenReturn = Record<Keys | "coverUrl" | "dlink", string>;

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
  const $ = load(data);
  const json2 = new Array<QueryLibgenReturn>();

  $('table[rules="cols"]').each((_, el) => {
    const result = {} as QueryLibgenReturn;
    for (let field of fields) {
      result[field] = $(el).find(`td:icontains("${field}")`).next().text();
      if (result["title"].length < 1) return;
    }
    const img = $(el).find("img");
    result["coverUrl"] = "https://libgen.is" + img.attr("src");
    result["dlink"] = "https://libgen.is" + img.parent().attr("href");
    json2.push(result);
  });

  if (options?.forceOneExtension) {
    const json = json2.filter((item, i) => item.isbn !== json2[i - 1]?.isbn);
    return json;
  }
  return json2;
}
