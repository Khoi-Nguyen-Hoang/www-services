import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import { logger } from "@hono/hono/logger";

import postgres from "postgres";

const app = new Hono();

app.use("/*", cors());
app.use("/*", logger());        //For logging requests to this URL

const sql = postgres();

app.get("/", (c) => c.json({ message: "Hello world!" }));
app.get("/todos", async (c) => {
  const todos = await sql`SELECT * FROM todos`;
  return c.json(todos);
});

app.post("/", async (c) => {
  const { query } = await c.req.json();
  const result = await sql.unsafe(query);
  return c.json(result);
});

app.post("/books", (c) => {
  // Create
});


app.get("/books", (c) => {
  // Read
});

app.put("/books/:id", (c) => {
  // Update
});

app.delete("/books/:id", (c) => {
  // Delete
});

export default app;