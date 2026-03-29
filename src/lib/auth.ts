/**
 * This file needs to be here for better-auth to automagically find it.
 * I think we can move it later on and explicitly pass this file to the
 * library and any plugins that we use.
 */

import { betterAuth } from "better-auth";
import { customSession } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../backend/database/db";
import * as schema from "../backend/database/auth-schema";
import { findUserRole } from "../backend/database/findUserRole";
import { createAuthMiddleware } from "better-auth/api";
import { userRole } from "../backend/database/schema";

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
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          db.insert(userRole).values({ role: "user", ownerId: user.id });
        },
      },
    },
  },
  // hooks: {
  //   after: createAuthMiddleware(async (ctx) => {
  //     if (ctx.path.startsWith("/sign-up")) {
  //       const newSession = ctx.context.newSession;
  //       if (newSession) {
  //         sendMessage({
  //           type: "user-register",
  //           name: newSession.user.name,
  //         });
  //       }
  //     }
  //   }),
  // },
  session: {},
  plugins: [
    // We need this so that we can put our own fields onto
    // the session. We're doing this to prevent another
    // round trip request to look up role info from the client.
    customSession(async ({ user, session }) => {
      let role = null;

      if (user) {
        const userWithTypingFixed = {
          ...user,
          /**
           * The `user` provided by customSession has slightly different
           * typing than the user provided by the underlying auth_schema.
           *
           * user.image in custom session can be undefined OR null. The
           * underlying schema can only be null.
           *
           * This coerces the undefined case to null as well.
           */
          image: user.image ?? null,
        };
        role = await findUserRole(userWithTypingFixed);
      }

      return {
        role,
        user: {
          ...user,
          // newField: "newField",
        },
        session,
      };
    }),
  ],
  // socialProviders: {
  //   github: {
  //     clientId: process.env.GITHUB_CLIENT_ID as string,
  //     clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
  //   },
  // },
});
