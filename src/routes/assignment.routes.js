import express from "express";
import { getAssignmentsByUser, getAssignmentsByProject } from "../controllers/assignment.controller.js";
import { authenticateToken, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/user/:userId", authenticateToken, authorizeRoles("ADMIN"), getAssignmentsByUser);
router.get("/project/:projectId", authenticateToken, getAssignmentsByProject);

export default router;
