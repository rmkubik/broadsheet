import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { ApiRouter } from "../../backend/api/apiRouter";

export const api = createTRPCClient<ApiRouter>({
  links: [
    httpBatchLink({
      // TODO:
      // What is this URL? How do I pull it from .env properly?
      url: "http://localhost:3000/api/v1",
    }),
  ],
});
