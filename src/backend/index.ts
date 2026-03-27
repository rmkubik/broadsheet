import express from "express";
import cors from "cors";
import path from "path";
import * as trpcExpress from "@trpc/server/adapters/express";
import { db } from "./database/db";
// import { user } from "./database/schema";
import { toNodeHandler } from "better-auth/node";
import { auth } from "../lib/auth";
import { apiRouter } from "./api/apiRouter";
import { apiPath } from "./api/apiPath";

const __dirname = import.meta.dirname;

const app = express();
const port = 3000;

app.all("/api/auth/{*any}", toNodeHandler(auth));

// created for each request
const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = Awaited<ReturnType<typeof createContext>>;

app.use(
  apiPath,
  trpcExpress.createExpressMiddleware({
    router: apiRouter,
    createContext,
  }),
);

// console.log(apiRouter.user.list);

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
