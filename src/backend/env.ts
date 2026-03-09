import { z } from "zod";

export const env = z
  .object({
    DATABASE_URL: z.string(),
    NODE_ENV: z.enum(["dev", "prod", "test"]),
  })
  .parse(process.env);
