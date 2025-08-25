import { RPCHandler } from "@orpc/server/fetch";
import { onError } from '@orpc/server'
import { appRouter } from "./routers";

export const rpcHandler = new RPCHandler(appRouter, {
    interceptors: [
        onError(error => {
            console.error(error)
        })
    ]
});
