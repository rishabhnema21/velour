import { pgTable, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { userBooks } from "./userBooks.js";

export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    clerkUserId: text("clerk_user_id").notNull(),
    username: text("username"),
    displayName: text("display_name"),
    avatarUrl: text("avatar_url"),
    bio: text("bio"),
    createdAt: timestamp("created_at", {withTimezone: true}).defaultNow(),
}, (table) => {
    return {
        clerkIdUnique: uniqueIndex("users_clerk_user_id_unique").on(table.clerkUserId),
        usernameIdx: uniqueIndex("users_username_unique").on(table.username)
    }
});

export const userRelations = relations(users, ({many}) => ({
    userBooks: many(userBooks),
}))