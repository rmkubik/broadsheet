import z from "zod";
import { publicProcedure, router } from "./trpc";
import { user } from "../database/schema";
import { db } from "../database/db";
import { eq } from "drizzle-orm";

export const apiRouter = router({
  user: {
    list: publicProcedure.query(async () => {
      const users = await db.select().from(user);

      return users;
    }),
    getById: publicProcedure.input(z.number()).query(async (opts) => {
      const { input } = opts;

      return await db.select().from(user).where(eq(user.id, input));
    }),
    create: publicProcedure
      .input(z.object({ name: z.string(), email: z.string() }))
      .mutation(async (opts) => {
        const { input } = opts;

        await db.insert(user).values(input);

        return user;
      }),
  },
});

export type ApiRouter = typeof apiRouter;
