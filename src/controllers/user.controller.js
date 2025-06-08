import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getMe(req, res, next) {
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

export async function updateMe(req, res, next) {
  try {
    const { name, profilePic, contact, ...rest } = req.body;
    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: { name, profilePic, contact, ...rest },
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
}

export async function listUsers(req, res, next) {
  try {
    const { role } = req.query;
    const users = await prisma.user.findMany({
      where: role ? { role } : {},
      select: { id: true, email: true, name: true, role: true, profilePic: true, contact: true },
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
}

export async function getUserById(req, res, next) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      select: { id: true, email: true, name: true, role: true, profilePic: true, contact: true },
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    next(err);
  }
}

export async function updateUserById(req, res, next) {
  try {
    const { name, profilePic, contact, ...rest } = req.body;
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { name, profilePic, contact, ...rest },
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
}

export async function deleteUser(req, res, next) {
  try {
    await prisma.user.delete({ where: { id: req.params.id } });
    res.json({ message: "User deleted" });
  } catch (err) {
    next(err);
  }
}
