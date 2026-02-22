import { pgTable, text, date, uuid, timestamp, integer, boolean, uniqueIndex } from "drizzle-orm/pg-core";
import { users } from "./user";

export const shelves = pgTable("shelves", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").references(() => users.id, {onDelete: "cascade"}).notNull(),
    name: text("name").notNull(),
    isSystem: text("is_system").default("false").notNull(),
    createdAt: timestamp("created_at", {withTimezone: true}).defaultNow().notNull(),

});