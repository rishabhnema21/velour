import { pgTable, text, date, uuid, timestamp, integer, boolean, uniqueIndex, unique } from "drizzle-orm/pg-core";
import { users } from "./user";

export const shelves = pgTable("shelves", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").references(() => users.id, {onDelete: "cascade"}).notNull(),
    name: text("name").notNull(),
    coverImage: text("cover_image"),
    isSystem: boolean("is_system").notNull().default(false),
    createdAt: timestamp("created_at", {withTimezone: true}).defaultNow().notNull(),
}, (table) => {
    return {
        userNameUnique: unique().on(table.userId, table.name),
    }
});