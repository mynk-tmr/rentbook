import { load } from "cheerio/slim";

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

type Options =
  | "topic"
  | "id"
  | "author"
  | "title"
  | "publisher"
  | "year"
  | "pages"
  | "language"
  | "filesize"
  | "extension";

interface QueryLibgenInput {
  /**
   * @param req - the query string for column eg. God of War
   */
  req: string;
  /**
   * @param column - the column eg. title, author
   */
  column: Options;
  /**
   * @param sort - the sort by criteria eg. year, author
   */
  sort: Options;
  /**
   * @param sortmode - the sort order eg. ASC, DESC
   */
  sortmode?: "DESC";
  /**
   * @param page - the page number eg. 1, 2, 3
   */
  page?: string;
  /**
   * @param res - the response limit eg. 25, 50, 100
   */
  res?: "50" | "100";
}

interface QueryLibgenOptions {
  /**
   * @param forceOneExtension - eliminate duplicates if there are multiple extensions for the same title
   */
  forceOneExtension: true;
}

/**
 * @example const data = await queryLibgen({
  req: "Data Structures",
  column: "title",
  sort: "year",
  sortmode: "DESC",
});
 */
export async function queryLibgen(
  input: QueryLibgenInput,
  options?: QueryLibgenOptions
) {
  const url = new URLSearchParams({
    view: "detailed",
    phrase: "1",
    sortmode: "ASC",
    page: "1",
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
