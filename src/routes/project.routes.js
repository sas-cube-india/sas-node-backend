import express from "express";
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  adminUpdateProject,
  assignUsersToProject,
} from "../controllers/project.controller.js";
import { authenticateToken, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authenticateToken, authorizeRoles("CUSTOMER"), createProject);
router.get("/", authenticateToken, getAllProjects);
router.get("/:id", authenticateToken, getProjectById);
router.put("/:id", authenticateToken, updateProject);
router.delete("/:id", authenticateToken, authorizeRoles("ADMIN"), deleteProject);

// For admin assignments and updates
router.post("/:id/assign", authenticateToken, authorizeRoles("ADMIN"), assignUsersToProject);
router.put("/:id/admin-update", authenticateToken, authorizeRoles("ADMIN"), adminUpdateProject);

export default router;
