import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import config from "../config/config";
import * as schema from "./schema/index";

if (!config.dbUrl) {
  throw new Error("DB_URL is not set in env");
}

const sql = neon(config.dbUrl);

export const db = drizzle(sql, { schema });