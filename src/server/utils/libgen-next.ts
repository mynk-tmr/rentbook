import { load } from 'cheerio/slim';
import type { SearchFilterDTO } from '~/dto/search-filter-dto';

const fields = [
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

export async function queryLibgen(input: SearchFilterDTO) {
  const url = new URLSearchParams({
    view: 'detailed',
    phrase: '1',
    ...input,
  });
  const href = `https://libgen.is/search.php?${url.toString()}`;
  console.log('Fetching from', href);
  const res = await fetch(href, {
    mode: 'cors',
  });
  const data = await res.text();
  let { books, records } = scrapPage(data);
  return { books, records };
}

function scrapPage(data: string) {
  const $ = load(data);
  const books = new Array<BookDataClient>();

  let records = $('font:icontains("files found")').text();
  records = records.match(/\d+/)?.at(0) || '0';
  if (records === '0') return { books, records };

  $('table[rules="cols"]').each((_, el) => {
    const result = {} as BookData;
    for (let field of fields) {
      result[field] = $(el).find(`td:icontains("${field}")`).next().text();
      if (result.title.length < 1) return;
    }
    const img = $(el).find('img');
    result.coverUrl = 'https://libgen.is' + img.attr('src');

    const { extension, size, ...record } = result;

    if (record.isbn === books.at(-1)?.isbn) {
      books[books.length - 1].dlinks.push({
        extension,
        size,
        url: 'https://libgen.is' + img.parent().attr('href'),
      });
      return;
    }

    record.dlinks = [
      {
        extension,
        size,
        url: 'https://libgen.is' + img.parent().attr('href'),
      },
    ];
    books.push(record);
  });
  return { books, records };
}
