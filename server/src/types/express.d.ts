import { users } from "../db/schema";

declare global {
    namespace Express {
        interface Request {
            User: typeof users.$inferSelect;
        }
    }
}

export{}

// TODO: auth() type to be declare here.