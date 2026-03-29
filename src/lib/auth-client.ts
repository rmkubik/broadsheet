import { createAuthClient } from "better-auth/react";
import { customSessionClient } from "better-auth/client/plugins";
import { auth } from "./auth";

// import { env } from "../backend/env";
export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  // baseURL: env.BASE_URL,
  plugins: [
    // We need this so that the client knows about our custom session field
    customSessionClient<typeof auth>(),
  ],
});
export const { signIn, signUp, signOut, useSession } = authClient;
