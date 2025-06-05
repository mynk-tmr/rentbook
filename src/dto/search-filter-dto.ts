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
  req: string().trim().min(3).max(255).catch("Readbook"),
  column: enum_(COLUMNS).catch("title"),
  sort: enum_(COLUMNS).catch("year"),
  sortmode: enum_(["ASC", "DESC"]).catch("DESC"),
  res: enum_(RES_VALUES).catch("25"),
  page: coerce
    .number()
    .min(1)
    .max(1000)
    .catch(1)
    .transform((x) => String(x)),
});

export type SearchFilterDTO = Infer<typeof SearchFilterSchema>;

export const ServerQuerySchema = object({
  req: string().trim().min(3).max(255),
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
