import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schema";
export const attachUser = async (req, res, next) => {
    try {
        const auth = req.auth();
        const clerkId = "userId" in auth ? auth.userId : null;
        if (!clerkId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        console.log("[attachUser] Clerk ID:", clerkId);
        const user = await db
            .select()
            .from(users)
            .where(eq(users.clerkUserId, clerkId))
            .limit(1);
        console.log("[attachUser] Query Result:", user);
        if (user.length === 0) {
            console.warn(`[attachUser] No user found for clerk_user_id=${clerkId}`);
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        req.User = user[0];
        next();
    }
    catch (error) {
        console.error("========== ATTACH USER ERROR ==========");
        console.error("Message:", error?.message);
        console.error("Cause:", error?.cause);
        console.error("Stack:", error?.stack);
        console.error("Full Error:", error);
        console.error("======================================");
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
//# sourceMappingURL=attatchUser.js.map