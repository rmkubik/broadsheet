import { z } from "zod";

export const env = z
  .object({
    DATABASE_URL: z.string(),
    NODE_ENV: z.enum(["development", "production", "test"]),
  })
  .parse(process.env);
