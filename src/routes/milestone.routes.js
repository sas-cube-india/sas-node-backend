import express from "express";
import {
  createMilestone,
  getMilestones,
  updateMilestone,
  deleteMilestone,
} from "../controllers/milestone.controller.js";
import { authenticateToken, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/:projectId", authenticateToken, authorizeRoles("ADMIN", "CONSULTANT"), createMilestone);
router.get("/:projectId", authenticateToken, getMilestones);
router.put("/:id", authenticateToken, authorizeRoles("ADMIN", "DEVELOPER", "CONSULTANT"), updateMilestone);
router.delete("/:id", authenticateToken, authorizeRoles("ADMIN", "CONSULTANT"), deleteMilestone);

export default router;
