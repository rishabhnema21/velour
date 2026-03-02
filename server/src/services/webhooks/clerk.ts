import { Request, Response } from "express";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/backend";
import { db } from "../../db";
import { shelves, users } from "../../db/schema";
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
        message: "Missing svix headers",
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
        message: "Invalid webhook signature",
      });
    }

    const { id } = evt.data;
    const eventType = evt.type;

    console.log(
      "Processing Clerk webhook event: ",
      eventType,
      " for user id: ",
      id,
    );

    // logging the entire event data for debugging
    console.log("Full Event Data: ", JSON.stringify(evt.data, null, 2));

    if (eventType === "user.created") {
      const { email_addresses, image_url, primary_email_address_id } = evt.data;

      const primaryEmail =
        email_addresses?.find(
          (email: any) => email.id === primary_email_address_id,
        )?.email_address ?? email_addresses?.[0]?.email_address;

      if (!primaryEmail) {
        return res.status(200).json({ success: true });
      }

      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, primaryEmail))
        .limit(1);
      let userId: string;
      if (existingUser.length) {
        // Email exists, update avatar & clerkUserId
        userId = existingUser[0].id;

        await db
          .update(users)
          .set({
            clerkUserId: id,
            avatar: image_url,
          })
          .where(eq(users.id, userId));
      } else {
        // Insert new user
        const inserted = await db
          .insert(users)
          .values({
            clerkUserId: id as string,
            email: primaryEmail,
            avatar: image_url,
          })
          .onConflictDoUpdate({
            target: users.clerkUserId,
            set: {
              email: primaryEmail,
              avatar: image_url,
            },
          })
          .returning({ id: users.id });

        userId = inserted[0]?.id; // ✅ assign userId here
      }

      if (!userId) {
        throw new Error("Failed to retrieve user ID after upsert");
      }

      const defaultShelves = [
        "TO BE READ",
        "CURRENTLY READING",
        "READ",
        "ON HOLD",
        "DNF",
      ];

      for (const shelfName of defaultShelves) {
        await db
          .insert(shelves)
          .values({
            userId,
            name: shelfName,
            isSystem: true,
          })
          .onConflictDoNothing(); // requires UNIQUE(userId, name)
      }
    } else if (eventType === "user.updated") {
      const { email_addresses, image_url, primary_email_address_id } = evt.data;

      const primaryEmail =
        email_addresses?.find(
          (email: any) => email.id === primary_email_address_id,
        )?.email_address ?? email_addresses?.[0]?.email_address;

      if (!primaryEmail) {
        return res.status(200).json({ success: true });
      }

      await db
        .update(users)
        .set({
          email: primaryEmail,
          avatar: image_url,
        })
        .where(eq(users.clerkUserId, id as string));
    } else if (eventType === "user.deleted") {
      console.log("Deleting user from database...");
      await db.delete(users).where(eq(users.clerkUserId, id as string));
      console.log("✅ User deleted");
    }

    console.log("🎉 Webhook handler completed, sending response");

    return res.status(200).json({
      success: true,
      message: "Webhook processed successfully",
    });
  } catch (err) {
    console.error("Error processing Clerk webhook: ", err);
    return res.status(400).json({
      success: false,
      message: "Invalid webhook event",
    });
  }
};
