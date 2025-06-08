import express from "express";
import { getSummaryAnalytics } from "../controllers/analytics.controller.js";
import { authenticateToken, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/summary", authenticateToken, authorizeRoles("ADMIN", "CONSULTANT"), getSummaryAnalytics);

export default router;
