import dotenv from "dotenv";
dotenv.config();

interface Config {
    port: number;
    nodeEnv: string;
    dbUrl: string;
    clerkPublishableKey: string;
    clerkSecretKey: string;
    clerkWebhookSecret: string;
    googleBooksApiKey?: string;
}

const config: Config = {
    port: Number(process.env.PORT) || 8080,
    nodeEnv: process.env.NODE_ENV || "development",
    dbUrl: process.env.DB_URL as string,
    clerkPublishableKey: process.env.CLERK_PUBLISHABLE_KEY as string,
    clerkSecretKey: process.env.CLERK_SECRET_KEY as string,
    clerkWebhookSecret: process.env.CLERK_WEBHOOK_SECRET as string,
    googleBooksApiKey: process.env.GOOGLE_BOOKS_API_KEY,
}

export default config;