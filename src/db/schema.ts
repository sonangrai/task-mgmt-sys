import { pgTable, uuid, varchar, timestamp, pgEnum } from "drizzle-orm/pg-core";

const timestamps = {
  updated_at: timestamp(),
  created_at: timestamp().defaultNow().notNull(),
  deleted_at: timestamp(),
};

export const statusEnum = pgEnum("status", [
  "pending",
  "in_progress",
  "completed",
  "cancelled",
  "on_hold",
]);
export const priorityEnum = pgEnum("priority", [
  "urgent",
  "high",
  "medium",
  "moderate",
  "low",
]);

export const task = pgTable("task", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid(),
  title: varchar("title").notNull(),
  description: varchar("description"),
  status: statusEnum().default("pending"),
  priority: priorityEnum().default("low"),
  due: timestamp(),
  completedOn: timestamp(),
  ...timestamps,
});

export type Task = typeof task.$inferSelect;
export type NewTask = typeof task.$inferInsert;
