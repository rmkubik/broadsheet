/**
 * This file needs to be here for better-auth to automagically find it.
 * I think we can move it later on and explicitly pass this file to the
 * library and any plugins that we use.
 */

import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../backend/database/db";
import * as schema from "../backend/database/auth-schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    // I don't understand why I need to pass this schema in since
    // I'm using the default better auth schema.
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  // socialProviders: {
  //   github: {
  //     clientId: process.env.GITHUB_CLIENT_ID as string,
  //     clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
  //   },
  // },
});
