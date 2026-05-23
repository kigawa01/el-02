import { createRequestHandler } from "@react-router/cloudflare";

// @ts-expect-error - build output
import * as build from "../build/server/index.js";

const handler = createRequestHandler({ build });

export default {
  fetch(request: Request, env: unknown, ctx: ExecutionContext) {
    return handler({
      request,
      env,
      waitUntil: ctx.waitUntil.bind(ctx),
      passThroughOnException: ctx.passThroughOnException.bind(ctx),
    });
  },
} satisfies ExportedHandler;
