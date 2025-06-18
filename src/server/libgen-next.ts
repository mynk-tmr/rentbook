import { load } from 'cheerio/slim';
import type { SearchFilterDTO } from '~/dto/search-filter-dto';
import { fields, mirror, type BookData, type BookDataClient } from './config';

export async function queryLibgen(input: SearchFilterDTO) {
  const url = new URLSearchParams({
    view: 'detailed',
    phrase: '1',
    ...input,
  });
  const href = `${mirror}/search.php?${url.toString()}`;
  const res = await fetch(href, { mode: 'cors' });
  return scrapPage(await res.text());
}

function scrapPage(data: string) {
  const $ = load(data);
  const books = new Array<BookDataClient>();
  const records =
    $('font:icontains("files found")').text().match(/\d+/)?.at(0) || '0';
  if (records === '0') return { books, records };

  $('table[rules="cols"]').each((_, el) => {
    //
    const result = {} as BookData;
    for (let field of fields) {
      result[field] = $(el).find(`td:icontains("${field}")`).next().text();
      if (result.title.length < 1) return;
    }

    const { extension, size, ...record } = result;
    const prevBook = books.at(-1);
    const dlink = {
      extension,
      size,
      url: `${mirror}/${$(el).find('img').parent().attr('href')}`,
    };

    if (record.isbn === prevBook?.isbn) {
      prevBook.dlinks.push(dlink);
      return;
    }

    record.dlinks = [dlink];
    result.coverUrl = `${mirror}/${$(el).find('img').attr('src')}`;
    books.push(record);
  });
  return { books, records };
}
