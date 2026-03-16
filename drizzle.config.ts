import { defineConfig } from "drizzle-kit";
import { env } from "./src/backend/env";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/backend/database/schema.ts",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
