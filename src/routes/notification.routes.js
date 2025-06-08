import express from "express";
import { getNotifications, sendNotification } from "../controllers/notification.controller.js";
import { authenticateToken, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", authenticateToken, getNotifications);
router.post("/", authenticateToken, authorizeRoles("ADMIN"), sendNotification);

export default router;
