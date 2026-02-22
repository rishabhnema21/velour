import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import config from "./src/config/config";

if (!config.dbUrl) {
    throw new Error("DB_URL is not set in env");
}

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: config.dbUrl
  },
});
