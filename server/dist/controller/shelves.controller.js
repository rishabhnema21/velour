import { db } from "../db";
import { shelves } from "../db/schema";
import { eq } from "drizzle-orm";
export const getShelves = async (req, res) => {
    try {
        // get the user from the request (attached by the attachUser middleware)
        const user = req.User;
        const shelvesData = await db.query.shelves.findMany({
            where: (shelves, { eq }) => eq(shelves.userId, user.id),
        });
        return res.status(200).json({ success: true, data: shelvesData });
    }
    catch (err) {
        console.log("Error getting shelves: ", err);
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
};
// export const getShelf = async (req: Request, res: Response) => {
//   try {
//     const user = req.User;
//     const shelfId = req.params;
//     if (!shelfId) {
//       console.log("Shelf ID not found");
//       return res
//         .status(404)
//         .json({ success: false, message: "Shelf ID not found" });
//     }
//     const shelf = await db.query.shelves.findFirst({
//       where: (shelves, { eq }) =>
//         and(eq(shelves.userId, user.id), (shelves.id, shelfId)),
//     });
//     return res.status(200).json({ success: true, data: shelf });
//   } catch (err) {
//     console.log("Failed to fetch shelf: ", err);
//     return res
//       .status(500)
//       .json({ success: false, message: "Internal Server Error" });
//   }
// };
// get all books of an individual book shelf of the user.
export const getShelfBooks = async (req, res) => {
    const user = req.User;
    const { shelfId } = req.params;
    if (!shelfId) {
        console.log("Shelf not found");
        return res.status(404).json({ success: false, message: "Shelf Not Found" });
    }
    try {
        const shelf = await db.query.shelves.findFirst({
            where: (shelves, { eq, and }) => and(eq(shelves.id, shelfId), eq(shelves.userId, user.id)),
            with: {
                shelfBooks: {
                    orderBy: (shelfBooks, { desc }) => desc(shelfBooks.createdAt),
                    with: {
                        userBook: {
                            with: {
                                book: true,
                            },
                        },
                    },
                },
            },
        });
        if (!shelf) {
            return res
                .status(400)
                .json({ success: false, message: "Shelf Not Found" });
        }
        return res.status(200).json({ success: true, data: shelf });
    }
    catch (err) {
        console.log("Error fetching shelf books: ", err);
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
};
// create custom shelves
export const createCustomShelves = async (req, res) => {
    const user = req.User;
    try {
        const name = req.body.name?.trim();
        if (!name || name.length < 2) {
            return res.status(400).json({
                success: false,
                message: "Shelf name must be at least 2 characters",
            });
        }
        const newShelf = await db
            .insert(shelves)
            .values({
            name,
            userId: user.id,
        })
            .returning();
        return res.status(201).json({
            success: true,
            data: newShelf[0],
            message: "Shelf Created Successfully!",
        });
    }
    catch (err) {
        console.log("Error creating shelf: ", err);
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
};
// rename custom shelves
export const renameShelf = async (req, res) => {
    const user = req.User;
    try {
        const { shelfId } = req.params;
        const name = req.body.name?.trim();
        if (!shelfId) {
            console.log("Shelf not found");
            return res
                .status(404)
                .json({ success: false, message: "Shelf Not Found" });
        }
        if (!name || name.length < 2) {
            return res.status(400).json({
                success: false,
                message: "Shelf name must be atleast 2 characters",
            });
        }
        const shelf = await db.query.shelves.findFirst({
            where: (shelves, { eq, and }) => and(eq(shelves.id, shelfId), eq(shelves.userId, user.id)),
        });
        if (!shelf) {
            return res.status(404).json({
                success: false,
                message: "Shelf Not Found",
            });
        }
        if (shelf.isSystem) {
            return res
                .status(400)
                .json({
                success: false,
                message: "Default Shelves could not be renamed",
            });
        }
        const updatedShelf = await db
            .update(shelves)
            .set({ name })
            .where(eq(shelves.id, shelfId))
            .returning();
        return res
            .status(200)
            .json({
            success: true,
            data: updatedShelf[0],
            message: "Shelf Renamed Successfully",
        });
    }
    catch (err) {
        console.log("Error Renaming Shelf: ", err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
// Deleting custom shelves
export const deleteShelf = async (req, res) => {
    const user = req.User;
    try {
        const { shelfId } = req.params;
        if (!shelfId) {
            console.log("Shelf not found");
            return res
                .status(404)
                .json({ success: false, message: "Shelf Not Found" });
        }
        const shelf = await db.query.shelves.findFirst({
            where: (shelves, { eq, and }) => and(eq(shelves.id, shelfId), eq(shelves.userId, user.id)),
        });
        if (!shelf) {
            return res.status(404).json({
                success: false,
                message: "Shelf Not Found",
            });
        }
        if (shelf.isSystem) {
            return res
                .status(400)
                .json({
                success: false,
                message: "Default Shelves could not be deleted",
            });
        }
        await db.delete(shelves).where(eq(shelves.id, shelfId));
        return res
            .status(200)
            .json({ success: true, message: "Shelf Deleted Successfully" });
    }
    catch (err) {
        console.log("Error Deleting Shelf: ", err);
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
};
//# sourceMappingURL=shelves.controller.js.map