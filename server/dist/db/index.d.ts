import "dotenv/config";
import * as schema from "./schema/index";
export declare const db: import("drizzle-orm/neon-http").NeonHttpDatabase<typeof schema> & {
    $client: import("@neondatabase/serverless").NeonQueryFunction<false, false>;
};
//# sourceMappingURL=index.d.ts.map