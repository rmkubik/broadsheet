import express from "express";
import cors from "cors";
import path from "path";
import * as trpcExpress from "@trpc/server/adapters/express";
import { db } from "./database/db";
import { user } from "./database/schema";
import { apiRouter } from "./api/apiRouter";

const __dirname = import.meta.dirname;

const app = express();
const port = 3000;

// created for each request
const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = Awaited<ReturnType<typeof createContext>>;

app.use(
  "/api/v1",
  trpcExpress.createExpressMiddleware({
    router: apiRouter,
    createContext,
  }),
);

console.log(apiRouter.user.list);

// Adds headers: Access-Control-Allow-Origin: *
app.use(cors());

// Serve static files from Vite build
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// app.get("/api/v1/users", async (req, res) => {
//   try {
//     const users = await db.select().from(user);
//     res.json({ users });
//   } catch (error) {
//     res.json({ error });
//   }
// });

// Catch-all for SPA router (not sure I want this)
app.get("/*splat", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
