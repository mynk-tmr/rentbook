import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { treeifyError, ZodError } from 'zod/v4';
import { ServerQuerySchema } from '~/dto/search-filter-dto';
import type { BookData } from './config';
import { queryLibgen } from './libgen-next';

const app = new Hono()
  .use(
    cors({
      origin: process.env.CLIENT_URL || '',
    })
  )
  .basePath('/api')
  .use(logger())
  .onError((err, c) => {
    if (err instanceof ZodError)
      return c.json({ success: false, error: treeifyError(err) });
    return c.json({ success: false, error: err.name });
  })
  .get('/libgen', async (c) => {
    const query = c.req.query();
    const input = ServerQuerySchema.parse(query);
    const data = await queryLibgen(input);
    return c.json({ success: true, data });
  })
  .get('/health', (c) => c.text('ok!'));

serve({
  fetch: app.fetch,
});

export type ServerResponse = Promise<
  | {
      success: true;
      data: {
        books: BookData[];
        records: string;
      };
    }
  | {
      success: false;
      error: string[];
    }
>;
