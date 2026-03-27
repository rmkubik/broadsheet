import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { ApiRouter } from "../../backend/api/apiRouter";
import { env } from "../env";
import { apiPath } from "../../backend/api/apiPath";

export const api = createTRPCClient<ApiRouter>({
  links: [
    httpBatchLink({
      url: `${env.BASE_URL}${apiPath}`,
    }),
  ],
});
