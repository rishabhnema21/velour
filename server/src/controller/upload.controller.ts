import { v2 as cloudinary } from "cloudinary";
import { Request, Response } from "express";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const getUploadSignature = async (req: Request, res: Response) => {
  const timestamp = Math.round(Date.now() / 1000);
  const checkParams = {
    timestamp,
    folder: "velour_shelf_covers",
  };
  const signature = cloudinary.utils.api_sign_request(
    checkParams,
    process.env.CLOUDINARY_API_SECRET!,
  );

  return res.status(200).json({
    success: true,
    data: {
      ...checkParams,
      signature,
      apiKey: process.env.CLOUDINARY_API_KEY,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    },
  });
};
