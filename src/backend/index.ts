import express from "express";
import cors from "cors";
import path from "path";
import { db } from "./database/db";
import { user } from "./database/schema";

const __dirname = import.meta.dirname;

const app = express();
const port = 3000;

// Adds headers: Access-Control-Allow-Origin: *
app.use(cors());

// Serve static files from Vite build
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("/api/v1/users", async (req, res) => {
  const users = await db.select().from(user);
  res.json({ users });
});

// Catch-all for SPA router (not sure I want this)
app.get("/*splat", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
