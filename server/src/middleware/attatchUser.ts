import { NextFunction, Request, Response } from "express";
import { users } from "../db/schema";
import { db } from "../db";
import { eq } from "drizzle-orm";

export const attachUser = async (req: Request, res: Response, next: NextFunction) => {
    const clerkId: string = req.auth().userId;
    console.log("Clerk ID of user: ", clerkId);
    const user = await db.select().from(users).where(eq(users.clerkUserId, clerkId)).limit(1);
    if (!user || user.length === 0) {
        return res.status(404).json({success: false, message: "User Not Found"});
    }
    console.log("User: ", user);
    req.User = user[0];
    next();
};