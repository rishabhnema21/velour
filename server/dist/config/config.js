import dotenv from "dotenv";
dotenv.config();
const config = {
    port: Number(process.env.PORT) || 8080,
    nodeEnv: process.env.NODE_ENV || "development",
    dbUrl: process.env.DB_URL,
    clerkpublishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    clerkSecretKey: process.env.CLERK_SECRET_KEY,
    clerkWebhookSecret: process.env.CLERK_WEBHOOK_SECRET,
    googleBooksApiKey: process.env.GOOGLE_BOOKS_API_KEY,
};
export default config;
//# sourceMappingURL=config.js.map