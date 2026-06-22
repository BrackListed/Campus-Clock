import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  clerk_user_id: text("clerk_user_id").notNull().unique(),
  username: text("username").notNull(),
  email: text("email").notNull().unique(),
  created_at: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(new Date()),
});

export const clockEntries = sqliteTable("clock_entries", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  user_id: integer("user_id")
    .notNull()
    .references(() => users.id),
  stopwatch_start: integer("stopwatch_start", { mode: "timestamp" }).notNull(),
  stopwatch_stop: integer("stopwatch_stop", { mode: "timestamp" }),
  created_at: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(new Date()),
});

export const assignments = sqliteTable("assignments", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  user_id: integer("user_id")
    .notNull()
    .references(() => users.id),
  subject: text("subject").notNull().default("Personal"),
  priority: text("priority", { enum: ["HIGH", "MEDIUM", "LOW"] })
    .notNull()
    .default("HIGH"),
  created_at: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(new Date()),
});

export const usersRelations = relations(users, ({ many }) => ({
  clockEntries: many(clockEntries),
  assignments: many(assignments),
}));

export const clockEntriesRelations = relations(clockEntries, ({ one }) => ({
  user: one(users, {
    fields: [clockEntries.user_id],
    references: [users.id],
  }),
}));

export const assignmentsRelations = relations(assignments, ({ one }) => ({
  user: one(users, {
    fields: [assignments.user_id],
    references: [users.id],
  }),
}));
