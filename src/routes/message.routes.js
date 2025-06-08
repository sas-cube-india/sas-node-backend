import express from "express";
import {
  getMessages,
  sendMessage,
} from "../controllers/message.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/:projectId", authenticateToken, getMessages);
router.post("/:projectId", authenticateToken, sendMessage);

export default router;
