import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import { z } from "zod";

dotenvExpand.expand(dotenv.config());

export const env = z
  .object({
    DATABASE_URL: z.string(),
    // TODO:
    // I'm leaving this here for now to centralize how I load
    // env vars. It feels a bit weird though that this DEV only
    // env var is loaded in and available in my backend env too.
    DATABASE_URL_DRIZZLE_KIT_DEV: z.string(),
    NODE_ENV: z.enum(["dev", "prod", "test"]),
  })
  .parse(process.env);
