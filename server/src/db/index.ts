import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import config from "../config/config.js";
import { Pool } from "pg";
import * as schema from "./schema/index.js";

if (!config.dbUrl) {
    throw new Error("DB_URL is not set in env");
}

const pool = new Pool({connectionString: config.dbUrl});

pool.on("connect", () => {
    console.log("Database connected successfully");
})

pool.on("error", (err) => {
    console.log("Database connection error: ",err);
})

export const db = drizzle(pool, {schema});