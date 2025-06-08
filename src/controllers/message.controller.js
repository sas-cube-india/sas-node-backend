import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getMessages(req, res, next) {
  try {
    const messages = await prisma.message.findMany({
      where: { projectId: req.params.projectId },
      include: { sender: true },
      orderBy: { createdAt: "asc" },
    });
    res.json(messages);
  } catch (err) {
    next(err);
  }
}

export async function sendMessage(req, res, next) {
  try {
    const { content } = req.body;
    const message = await prisma.message.create({
      data: {
        content,
        projectId: req.params.projectId,
        senderId: req.user.id,
      },
    });
    res.status(201).json(message);
  } catch (err) {
    next(err);
  }
}
