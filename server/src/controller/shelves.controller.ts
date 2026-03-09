import { Request, Response } from "express";
import { db } from "../db";

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
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
