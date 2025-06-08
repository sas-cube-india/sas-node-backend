import express from "express";
import multer from "multer";
import {
  uploadFile,
  getFilesByProject,
  deleteFile,
} from "../controllers/file.controller.js";
import { authenticateToken, authorizeRoles } from "../middlewares/auth.middleware.js";

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post("/:projectId", authenticateToken, upload.single("file"), uploadFile);
router.get("/:projectId", authenticateToken, getFilesByProject);
router.delete("/:fileId", authenticateToken, authorizeRoles("ADMIN"), deleteFile);

export default router;
