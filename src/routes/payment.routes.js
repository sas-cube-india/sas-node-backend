import express from "express";
import {
  createPayment,
  getPaymentsByProject,
  getAllPayments,
} from "../controllers/payment.controller.js";
import { authenticateToken, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/:projectId", authenticateToken, authorizeRoles("CUSTOMER"), createPayment);
router.get("/:projectId", authenticateToken, getPaymentsByProject);
router.get("/", authenticateToken, authorizeRoles("ADMIN"), getAllPayments);

export default router;
