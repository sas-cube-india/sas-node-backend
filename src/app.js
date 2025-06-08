import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

// AdminJS and adapters
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import { PrismaClient } from "@prisma/client";
import AdminJSPrisma from "@adminjs/prisma";

// API route imports
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import projectRoutes from "./routes/project.routes.js";
import assignmentRoutes from "./routes/assignment.routes.js";
import milestoneRoutes from "./routes/milestone.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import fileRoutes from "./routes/file.routes.js";
import messageRoutes from "./routes/message.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

dotenv.config();

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

// --- AdminJS Setup ---
AdminJS.registerAdapter({ Resource: AdminJSPrisma.Resource, Database: AdminJSPrisma.Database });

const prisma = new PrismaClient();

const adminJs = new AdminJS({
  databases: [prisma],
  rootPath: "/admin",
  branding: {
    companyName: "Freelancer Platform Admin",
  },
});

// WARNING: For production, move these credentials to environment variables!
const ADMIN = {
  email: process.env.ADMIN_EMAIL || "admin@example.com",
  password: process.env.ADMIN_PASSWORD || "SuperSecret123",
};

const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
  adminJs,
  {
    authenticate: async (email, password) => {
      if (email === ADMIN.email && password === ADMIN.password) {
        return ADMIN;
      }
      return null;
    },
    cookieName: "adminjs",
    cookiePassword: process.env.ADMIN_COOKIE_SECRET || "sessionsecret",
  },
  null,
  {
    resave: false,
    saveUninitialized: true,
  }
);

app.use(adminJs.options.rootPath, adminRouter);
// --- End AdminJS Setup ---

// Swagger OpenAPI setup
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: { title: "Freelancer Platform API", version: "1.0.0" },
  },
  apis: ["./src/routes/*.js"],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Main API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/milestones", milestoneRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/analytics", analyticsRoutes);

app.use(errorHandler);

export default app;
