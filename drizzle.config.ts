import { defineConfig } from "drizzle-kit";
import { env } from "./src/backend/env";

export default defineConfig({
  dialect: "postgresql",
  // This lets us have multiple different schema files ingested by drizzle.
  // We could intentionally split files for convenience later. This is required
  // in the short term because better-auth generates its own schema file we
  // need to ingest.
  schema: "./src/backend/database/*",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
