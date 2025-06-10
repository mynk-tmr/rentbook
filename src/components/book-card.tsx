import { Badge, Button, Card, Group, Text } from '@mantine/core';
import { Link } from '@tanstack/react-router';
import type { BookDataClient } from '~/server/utils/libgen-next';

function defaultText(str: string) {
  return str || 'N/A';
}

export function BookCard(props: BookDataClient) {
  return (
    <Card shadow='md' padding='lg' radius='md' withBorder>
      <article className='grid h-full place-content-between justify-stretch'>
        <Text fw={700} size='md' className='overflow-x-hidden mb-2'>
          {defaultText(props.title)}
        </Text>
        <Text c='dimmed'>{defaultText(props.author)}</Text>

        <Group mt='xs'>
          <Badge color='blue' variant='light'>
            {defaultText(props.year)}
          </Badge>
          <Badge color='orange' variant='light'>
            {defaultText(props.language)}
          </Badge>
          <Badge color='teal' variant='light'>
            {defaultText(props.pages).match(/\d+/)?.[0] || 'N/A'}{' '}
            <span className='lowercase'>pages</span>
          </Badge>
        </Group>

        <Text size='sm' mt='sm' className='font-semibold'>
          Publisher:{' '}
          {props.publisher.length === 0 ? (
            'N/A'
          ) : (
            <Link
              className='font-semibold underline decoration-dotted text-sky-700'
              to='/search'
              search={{
                column: 'publisher',
                req: props.publisher,
                page: 1,
                res: '25',
                sort: 'year',
                sortmode: 'DESC',
              }}
            >
              {props.publisher}
            </Link>
          )}
          <br />
          ISBN: <code>{defaultText(props.isbn.replace(/[,;].*/, ''))}</code>
        </Text>
        <br />
        <div className='flex gap-2 flex-wrap *:grow max-h-sm overflow-y-auto'>
          {props.dlinks.map((dlink, i) => (
            <Button
              size='sm'
              key={i}
              variant='outline'
              component='a'
              href={dlink.url}
              target='_blank'
            >
              {dlink.extension.toUpperCase()}{' '}
              {dlink.size.match(/\d+\s\w\w/)?.[0] || dlink.size}
            </Button>
          ))}
        </div>
      </article>
    </Card>
  );
}
