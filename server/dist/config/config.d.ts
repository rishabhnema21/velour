interface Config {
    port: number;
    nodeEnv: string;
    dbUrl: string;
    clerkSecretKey: string;
    clerkpublishableKey: string;
    clerkWebhookSecret: string;
    googleBooksApiKey?: string;
}
declare const config: Config;
export default config;
//# sourceMappingURL=config.d.ts.map