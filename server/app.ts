import { Hono } from "hono";
import { logger } from "hono/logger";
import { expensesRoute } from "./routes/expense";

const app = new Hono();

app.use("*", logger());

app.get("/test", (c) => {
  return c.json({ message: "Hello, World!" });
});

app.route("/api/expenses", expensesRoute);

export default app;
