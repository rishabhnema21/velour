import express from "express";
import { Router } from "express";
import { clerkWebhookHandler } from "../services/webhooks/clerk";
const router = Router();
router.post("/clerk", express.raw({ type: "application/json" }), clerkWebhookHandler);
export default router;
//# sourceMappingURL=authRoutes.js.map