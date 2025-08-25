import { OpenAPIHandler } from "@orpc/openapi/fetch";
import { onError } from '@orpc/server'
import { appRouter } from "./routers";
import { OpenAPIReferencePlugin } from "@orpc/openapi/plugins";
import { ZodToJsonSchemaConverter } from "@orpc/zod/zod4";
import { auth } from "./lib/auth";

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
            specGenerateOptions: async () => {
                const openAPISchema = await auth.api.generateOpenAPISchema()

                openAPISchema.paths = Object.fromEntries(
                    Object.entries(openAPISchema.paths).map(([key, value]) => {
                        return [`/auth${key}`, value]
                    })
                )

                return {
                    ...openAPISchema as any,
                    servers: [
                        { url: '/api' }
                    ],
                }
            }
        })
    ]
});
