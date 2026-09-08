import "dotenv/config";
import { defineConfig } from "prisma/config";

// Central Prisma configuration (Prisma ORM v7).
// For migrations, use the direct/unpooled connection (DATABASE_URL_UNPOOLED) if available
// to avoid transaction/advisory lock limitations of connection poolers (PgBouncer).
const migrationUrl =
  process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL || "";

export default defineConfig({
  // Main schema entry point.
  schema: "prisma/schema.prisma",
  // Where migrations are stored.
  migrations: {
    path: "prisma/migrations",
  },
  // Database connection string (PostgreSQL).
  datasource: {
    url: migrationUrl,
  },
});
