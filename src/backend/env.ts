import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import { z } from "zod";

dotenvExpand.expand(dotenv.config());

export const env = z
  .object({
    DATABASE_URL: z.string(),
    NODE_ENV: z.enum(["dev", "prod", "test"]),
  })
  .parse(process.env);
