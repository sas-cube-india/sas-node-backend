import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createMilestone(req, res, next) {
  try {
    const { name, due, status } = req.body;
    const milestone = await prisma.milestone.create({
      data: {
        name,
        due: new Date(due),
        status: status || "Pending",
        projectId: req.params.projectId,
      },
    });
    res.status(201).json(milestone);
  } catch (err) {
    next(err);
  }
}

export async function getMilestones(req, res, next) {
  try {
    const milestones = await prisma.milestone.findMany({
      where: { projectId: req.params.projectId },
    });
    res.json(milestones);
  } catch (err) {
    next(err);
  }
}

export async function updateMilestone(req, res, next) {
  try {
    const { name, due, status } = req.body;
    const milestone = await prisma.milestone.update({
      where: { id: req.params.id },
      data: { name, due: due ? new Date(due) : undefined, status },
    });
    res.json(milestone);
  } catch (err) {
    next(err);
  }
}

export async function deleteMilestone(req, res, next) {
  try {
    await prisma.milestone.delete({ where: { id: req.params.id } });
    res.json({ message: "Milestone deleted" });
  } catch (err) {
    next(err);
  }
}
