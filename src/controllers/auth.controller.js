import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const JWT_EXPIRY = "7d";

export async function register(req, res, next) {
  try {
    const { email, password, name, role } = req.body;
    if (!email || !password || !name) return res.status(400).json({ message: "Missing fields" });
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return res.status(409).json({ message: "Email exists" });

    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hash, name, role: role?.toUpperCase() || "CUSTOMER" },
    });
    res.status(201).json({ id: user.id, email: user.email, name: user.name, role: user.role });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: JWT_EXPIRY });
    res.cookie("jwt", token, { httpOnly: true, sameSite: "lax", maxAge: 604800000 });
    res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch (err) {
    next(err);
  }
}

export async function logout(req, res, next) {
  try {
    res.clearCookie("jwt");
    res.json({ message: "Logged out" });
  } catch (err) {
    next(err);
  }
}

export async function forgotPassword(req, res, next) {
  // Implementation: send email with OTP or reset link
  res.json({ message: "Password reset link sent (not implemented)" });
}

export async function resetPassword(req, res, next) {
  // Implementation: verify OTP or token, set new password
  res.json({ message: "Password reset (not implemented)" });
}

export async function me(req, res, next) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, email: true, name: true, role: true, profilePic: true, contact: true },
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
}
