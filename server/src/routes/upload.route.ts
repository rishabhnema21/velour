import { requireAuth } from "@clerk/express";
import express from "express";
import { attachUser } from "../middleware/attatchUser";
import { getUploadSignature } from "../controller/upload.controller";
const router = express.Router();

router.use(requireAuth(), attachUser);
router.get("/signature", getUploadSignature);

export default router;