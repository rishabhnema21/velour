import { Request, RequestHandler, Response } from "express";
import { db } from "../db";
import { highlights } from "../db/schema";

type createHighlightParams = {
    userBookId: string
}

export const createHighlight : RequestHandler<createHighlightParams> = async (req, res) => {
    try {
        const user = req.User;
        const { quote, note, pageNumber } = req.body;
        const {userBookId} = req.params; 
        if (!userBookId) {
            return res.status(400).json({success: false, message: "userBookId is required" });
        }

        const trimmedQuote = quote?.trim();

        if (!trimmedQuote) {
            return res.status(400).json({success: false, message: "quote is required" });
        }

        const userbook = await db.query.userBooks.findFirst({
            where: (userBooks, { eq, and }) =>
                and(eq(userBooks.id, userBookId), eq(userBooks.userId, user.id)),
        });

        if (!userbook) {
            return res.status(404).json({success: false, message: "User book not found" });
        }

        const [highlight] = await db.insert(highlights).values({
            userId: user.id,
            userBookId,
            quote: trimmedQuote,
            note,
            pageNumber,
        }).returning();

        return res.status(201).json({ success: true, message: "Highlight created successfully", data: highlight });

    } catch(err) {
        console.error("Error in creating highlight: ", err);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}