export const mirror = 'https://libgen.is';
export const fields = [
  'title', //always keep title as first
  'author',
  'series',
  'publisher',
  'city',
  'year',
  'edition',
  'language',
  'pages',
  'isbn',
  'id',
  'added',
  'modified',
  'size',
  'extension',
] as const;

type Keys = (typeof fields)[number];

export interface BookData extends Record<Keys, string> {
  coverUrl: string;
  dlinks: Array<{ extension: string; url: string; size: string }>;
}

export type BookDataClient = Omit<BookData, 'extension' | 'size'>;
