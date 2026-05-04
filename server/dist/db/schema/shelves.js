import { pgTable, text, uuid, timestamp, boolean, unique } from "drizzle-orm/pg-core";
import { users } from "./user";
export const shelves = pgTable("shelves", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
    name: text("name").notNull(),
    isSystem: boolean("is_system").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => {
    return {
        userNameUnique: unique().on(table.userId, table.name),
    };
});
//# sourceMappingURL=shelves.js.map