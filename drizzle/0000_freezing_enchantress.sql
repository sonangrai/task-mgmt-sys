CREATE TYPE "public"."priority" AS ENUM('urgent', 'high', 'medium', 'moderate', 'low');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('pending', 'in_progress', 'completed', 'cancelled', 'on_hold');--> statement-breakpoint
CREATE TABLE "task" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar NOT NULL,
	"description" varchar,
	"status" "status" DEFAULT 'pending',
	"priority" "priority" DEFAULT 'low',
	"due" timestamp,
	"completedOn" timestamp,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
