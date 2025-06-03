import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { getRandomGreet } from "./utils/get-random-greet";

const app = new Hono()
  .use(
    cors({
      origin: process.env.CLIENT_URL || "",
    })
  )
  .basePath("/api")
  .use(logger())
  .get("/", (c) => c.text(getRandomGreet()));

serve({
  fetch: app.fetch,
});
