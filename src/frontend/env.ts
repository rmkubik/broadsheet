import z from "zod";

export const env = z
  .object({
    MODE: z.string(),
    BASE_URL: z.string(),
    PROD: z.boolean(),
    DEV: z.boolean(),
    SSR: z.boolean(),
  })
  .parse(import.meta.env);
