import {
  coerce,
  enum as enum_,
  object,
  string,
  type infer as Infer,
} from "zod/v4";

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

export const SearchFilterSchema = object({
  req: string().max(255).default(""),
  column: enum_(COLUMNS).default("title"),
  sort: enum_(COLUMNS).default("year"),
  sortmode: enum_(["ASC", "DESC"]).default("ASC"),
  res: enum_(RES_VALUES).default("25"),
  page: coerce
    .number()
    .min(1)
    .max(1000)
    .default(1)
    .transform((x) => String(x)),
});

export type SearchFilterDTO = Infer<typeof SearchFilterSchema>;

export const ServerQuerySchema = object({
  req: string().max(255),
  column: enum_(COLUMNS),
  sort: enum_(COLUMNS),
  sortmode: enum_(["ASC", "DESC"]),
  res: enum_(RES_VALUES),
  page: coerce
    .number()
    .min(1)
    .max(1000)
    .transform((x) => String(x)),
});
