import { createAuthClient } from "better-auth/react";
// import { env } from "../backend/env";
export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  // baseURL: env.BASE_URL,
});
export const { signIn, signUp, signOut, useSession } = createAuthClient();
