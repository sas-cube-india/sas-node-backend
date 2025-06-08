import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getAssignmentsByUser(req, res, next) {
  try {
    const assignments = await prisma.assignment.findMany({
      where: {
        OR: [
          { developerId: req.params.userId },
          { consultantId: req.params.userId },
        ],
      },
      include: { project: true },
    });
    res.json(assignments);
  } catch (err) {
    next(err);
  }
}

export async function getAssignmentsByProject(req, res, next) {
  try {
    const assignments = await prisma.assignment.findMany({
      where: { projectId: req.params.projectId },
      include: { developer: true, consultant: true },
    });
    res.json(assignments);
  } catch (err) {
    next(err);
  }
}
