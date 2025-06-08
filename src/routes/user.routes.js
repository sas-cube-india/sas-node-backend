import express from "express";
import {
  getMe,
  updateMe,
  getUserById,
  updateUserById,
  deleteUser,
  listUsers,
} from "../controllers/user.controller.js";
import { authenticateToken, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/me", authenticateToken, getMe);
router.put("/me", authenticateToken, updateMe);
router.get("/", authenticateToken, authorizeRoles("ADMIN"), listUsers);
router.get("/:id", authenticateToken, authorizeRoles("ADMIN"), getUserById);
router.put("/:id", authenticateToken, authorizeRoles("ADMIN"), updateUserById);
router.delete("/:id", authenticateToken, authorizeRoles("ADMIN"), deleteUser);

export default router;
