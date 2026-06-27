import { db } from "../db";
import { highlights } from "../db/schema";
import { and, eq } from "drizzle-orm";
export const createHighlight = async (req, res) => {
    try {
        const user = req.User;
        const { quote, note, pageNumber } = req.body;
        const { userBookId } = req.params;
        if (!userBookId) {
            return res
                .status(400)
                .json({ success: false, message: "userBookId is required" });
        }
        const trimmedQuote = quote?.trim();
        if (!trimmedQuote) {
            return res
                .status(400)
                .json({ success: false, message: "quote is required" });
        }
        const userbook = await db.query.userBooks.findFirst({
            where: (userBooks, { eq, and }) => and(eq(userBooks.id, userBookId), eq(userBooks.userId, user.id)),
        });
        if (!userbook) {
            return res
                .status(404)
                .json({ success: false, message: "User book not found" });
        }
        const [highlight] = await db
            .insert(highlights)
            .values({
            userId: user.id,
            userBookId,
            quote: trimmedQuote,
            note,
            pageNumber,
        })
            .returning();
        return res
            .status(201)
            .json({
            success: true,
            message: "Highlight created successfully",
            data: highlight,
        });
    }
    catch (err) {
        console.error("Error in creating highlight: ", err);
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
};
export const getAllHighlights = async (req, res) => {
    const user = req.User;
    try {
        const userHighlights = await db.query.highlights.findMany({
            where: (highlights, { eq }) => eq(highlights.userId, user.id),
            orderBy: (highlights, { desc }) => desc(highlights.createdAt),
            with: {
                userBook: {
                    with: {
                        book: true,
                    },
                },
            },
        });
        return res.status(200).json({ success: true, data: userHighlights });
    }
    catch (err) {
        console.log("Error fetching highlights: ", err);
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
};
export const updateHighlights = async (req, res) => {
    const user = req.User;
    try {
        const { highlightId } = req.params;
        if (!highlightId) {
            return res
                .status(400)
                .json({ success: false, message: "highlightId is required" });
        }
        const { quote, note, pageNumber } = req.body;
        const trimmedQuote = quote?.trim();
        if (!trimmedQuote) {
            return res
                .status(400)
                .json({ success: false, message: "quote is required" });
        }
        const [updatedHighlight] = await db
            .update(highlights)
            .set({
            quote: trimmedQuote,
            note,
            pageNumber,
        })
            .where(and(eq(highlights.id, highlightId), eq(highlights.userId, user.id)))
            .returning();
        if (!updatedHighlight) {
            return res
                .status(404)
                .json({ success: false, message: "Highlight not found" });
        }
        return res
            .status(200)
            .json({
            success: true,
            message: "Highlight updated successfully",
            data: updatedHighlight,
        });
    }
    catch (err) {
        console.log("Failed to update highlight", err);
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
};
export const deleteHighlights = async (req, res) => {
    const user = req.User;
    try {
        const { highlightId } = req.params;
        if (!highlightId) {
            return res.status(400).json({ success: false, message: "Highlight id is required" });
        }
        const [deletedHighlight] = await db.delete(highlights).where(and(eq(highlights.id, highlightId), eq(highlights.userId, user.id))).returning();
        if (!deletedHighlight) {
            return res.status(404).json({ success: false, message: "Highlight not found" });
        }
        return res.status(200).json({ success: true, message: "Highlight deleted successfully" });
    }
    catch (err) {
        console.log("Failed to delete Highlight", err);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
//# sourceMappingURL=highlight.controller.js.map