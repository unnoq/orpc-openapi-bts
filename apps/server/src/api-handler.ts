import { OpenAPIHandler } from "@orpc/openapi/fetch";
import { onError } from '@orpc/server'
import { appRouter } from "./routers";
import { OpenAPIReferencePlugin } from "@orpc/openapi/plugins";
import { ZodToJsonSchemaConverter } from "@orpc/zod/zod4";

export const apiHandler = new OpenAPIHandler(appRouter, {
    interceptors: [
        onError(error => {
            console.error(error)
        })
    ],
    plugins: [
        new OpenAPIReferencePlugin({
            schemaConverters: [
                new ZodToJsonSchemaConverter(),
            ],
        }),
    ]
});
