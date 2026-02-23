import { Request, Response } from "express";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/backend";
import { db } from "../../db";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";
import config from "../../config/config";

export const clerkWebhookHandler = async (req: Request, res: Response) => {
    try {
        if (!config.clerkWebhookSecret) {
            throw new Error("Clerk webhook secret is not configured");
        }

        console.log(config.clerkWebhookSecret);

        // Get the headers
        const svix_id = req.headers["svix-id"] as string;
        const svix_timestamp = req.headers["svix-timestamp"] as string;
        const svix_signature = req.headers["svix-signature"] as string;

        // If there are no headers, error out
        if (!svix_id || !svix_timestamp || !svix_signature) {
            return res.status(400).json({ 
                success: false, 
                message: "Missing svix headers" 
            });
        }

        // Get the body
        const payload = req.body.toString();

        // Create a new Svix instance with your webhook secret
        const wh = new Webhook(config.clerkWebhookSecret);

        let evt: WebhookEvent;

        // Verify the payload with the headers
        try {
            evt = wh.verify(payload, {
                "svix-id": svix_id,
                "svix-timestamp": svix_timestamp,
                "svix-signature": svix_signature,
            }) as WebhookEvent;
        } catch (err) {
            console.error("Error verifying webhook:", err);
            return res.status(400).json({ 
                success: false, 
                message: "Invalid webhook signature" 
            });
        }

        const { id } = evt.data;
        const eventType = evt.type;

        console.log("Processing Clerk webhook event: ", eventType, " for user id: ", id);

        // logging the entire event data for debugging
        console.log("Full Event Data: ", JSON.stringify(evt.data, null, 2));

        if (eventType === "user.created" || eventType === "user.updated") {
            console.log("Event type matched: user.created or user.updated");

            const { email_addresses, image_url } = evt.data;

            // logging extracted data for debugging
            console.log("Extracted email_addresses: ", email_addresses);
            console.log("Extracted image_url: ", image_url);
            console.log("Extracted primary_email_address_id: ", evt.data.primary_email_address_id);

            const primaryEmail = email_addresses?.find((email: any) => email.id === evt.data.primary_email_address_id)?.email_address 
                ?? email_addresses?.[0]?.email_address;

            console.log("Determined primary email: ", primaryEmail);

            if (primaryEmail) {

                console.log("Attempting database insert with:");
                console.log({
                    clerkUserId: id,
                    email: primaryEmail,
                    avatar: image_url,
                })

                try {
                    const result = await db.insert(users).values({
                        clerkUserId: id as string,
                        email: primaryEmail as string,
                        avatar: image_url as string,
                    }).onConflictDoUpdate({
                        target: users.clerkUserId,
                        set: {
                            email: primaryEmail as string,
                            avatar: image_url as string,
                        }
                    });

                    console.log("✅✅✅ DATABASE INSERT SUCCESSFUL!");
                    console.log("Result:", result);
                } catch (dbError) {
                    console.error("❌❌❌ DATABASE ERROR:", dbError);
 
                }
            }
            else {
                console.error("⚠️⚠️⚠️ primaryEmail is null/undefined, skipping insert");
            }
        }
        else {
            console.log("ℹ️ Event type is not user.created or user.updated, skipping");
        }

        if (eventType === "user.deleted") {
            console.log("Deleting user from database...");
            await db.delete(users).where(eq(users.clerkUserId, id as string));
            console.log("✅ User deleted");
        }

        console.log("🎉 Webhook handler completed, sending response");

        return res.status(200).json({
            success: true, 
            message: "Webhook processed successfully"
        });
    } catch(err) {
        console.error("Error processing Clerk webhook: ", err);
        return res.status(400).json({
            success: false, 
            message: "Invalid webhook event"
        });
    }
}