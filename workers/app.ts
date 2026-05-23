import { createRequestHandler } from "@react-router/cloudflare";

// @ts-expect-error - build output
import * as build from "../build/server/index.js";

const handler = createRequestHandler(build);

export default {
  fetch(request: Request & { cf?: IncomingRequestCfProperties }, env: Env, ctx: ExecutionContext) {
    return handler(request, { cloudflare: { env, ctx, cf: request.cf ?? {}, caches } });
  },
} satisfies ExportedHandler<Env>;
