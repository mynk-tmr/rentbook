import { Card, Select } from '@mantine/core';
import { useState } from 'react';
import type { BookData } from '~/server/config';
import { BookCard } from './book-card';
import { Fallback } from './book-results';

export function useBookFilter(books: BookData[]) {
  const filters = books.reduce(
    (acc, book) => {
      acc.year.add(book.year || 'N/A');
      acc.language.add(book.language);
      return acc;
    },
    {
      year: new Set<string>(),
      language: new Set<string>(),
    }
  );
  const [year, setYear] = useState<string | null>(null);
  const [language, setlanguage] = useState<string | null>(null);
  const filteredBooks = books.filter(
    (book) =>
      (!year || book.year === year) && (!language || book.language === language)
  );
  const currents = { year, language };
  return {
    filters,
    filteredBooks,
    currents,
    setYear,
    setlanguage,
  };
}

export function BookResultsInner(props: { books: BookData[] }) {
  const { filters, filteredBooks, setlanguage, setYear, currents } =
    useBookFilter(props.books);
  return (
    <>
      <Card className='mx-6 mt-3'>
        <div className='flex gap-4 flex-wrap'>
          {Object.keys(filters).map((key) => (
            <Select
              w={120}
              key={key}
              label={key.toUpperCase()}
              //@ts-expect-error
              data={Array.from(filters[key]).sort((a, b) => a.localeCompare(b))}
              //@ts-expect-error
              value={currents[key]}
              onChange={(v) => {
                if (key === 'year') setYear(v);
                if (key === 'language') setlanguage(v);
              }}
              onClear={() => {
                if (key === 'year') setYear(null);
                if (key === 'language') setlanguage(null);
              }}
              clearable
            />
          ))}
        </div>
      </Card>
      {filteredBooks.length ? (
        <section className='grid xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-6 py-2'>
          {filteredBooks.map((book) => (
            <BookCard key={book.id + book.extension} {...book} />
          ))}
        </section>
      ) : (
        <Fallback>No Filters Matched</Fallback>
      )}
    </>
  );
}
