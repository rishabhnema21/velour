import { Request, Response, RequestHandler } from "express";
import { db } from "../db";
import type { ShelfParams } from "../types/params";

export const getShelves = async (req: Request, res: Response) => {
  try {
    // get the user from the request (attached by the attachUser middleware)
    const user = req.User;
    const shelvesData = await db.query.shelves.findMany({
      where: (shelves, { eq }) => eq(shelves.userId, user.id),
    });

    return res.status(200).json({ success: true, data: shelvesData });
  } catch (err) {
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

export const getShelfBooks: RequestHandler<ShelfParams> = async (
  req,
  res,
) => {
  const user = req.User;
  const { shelfId } = req.params;
  if (!shelfId) {
    console.log("Shelf not found");
    return res.status(404).json({ success: false, message: "Shelf Not Found" });
  }

  try {
    const shelf = await db.query.shelves.findFirst({
      where: (shelves, { eq, and }) =>
        and(eq(shelves.id, shelfId), eq(shelves.userId, user.id)),
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
  } catch (err) {
    console.log("Error fetching shelf books: ", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
