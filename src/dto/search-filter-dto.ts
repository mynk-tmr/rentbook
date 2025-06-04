import { z } from "zod/v4";

export const COLUMNS = [
  "topic",
  "id",
  "author",
  "title",
  "publisher",
  "year",
  "pages",
  "language",
  "filesize",
  "extension",
] as const;

export const RES_VALUES = ["25", "50", "100"] as const;

export const SearchFilterSchema = z.object({
  req: z.string().max(255).default(""),
  column: z.enum(COLUMNS).default("title"),
  sort: z.enum(COLUMNS).default("year"),
  sortmode: z.enum(["ASC", "DESC"]).default("ASC"),
  res: z.enum(RES_VALUES).default("25"),
  page: z.coerce
    .number()
    .min(1)
    .max(1000)
    .default(1)
    .transform((x) => String(x)),
});

export type SearchFilterDTO = z.infer<typeof SearchFilterSchema>;

export const ServerQuerySchema = z.object({
  req: z.string().max(255),
  column: z.enum(COLUMNS),
  sort: z.enum(COLUMNS),
  sortmode: z.enum(["ASC", "DESC"]),
  res: z.enum(RES_VALUES),
  page: z.coerce
    .number()
    .min(1)
    .max(1000)
    .transform((x) => String(x)),
});
