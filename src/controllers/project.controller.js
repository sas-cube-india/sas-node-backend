import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createProject(req, res, next) {
  try {
    const { title, summary, description, techStack, budget, timeline } = req.body;
    const project = await prisma.project.create({
      data: {
        title,
        summary,
        description,
        techStack,
        budget: parseFloat(budget),
        timeline,
        customer: { connect: { id: req.user.id } },
      },
    });
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
}

export async function getAllProjects(req, res, next) {
  try {
    const { role, id } = req.user;
    let where = {};
    if (role === "CUSTOMER") {
      where.customerId = id;
    } else if (role === "DEVELOPER") {
      where.assignments = { some: { developerId: id } };
    } else if (role === "CONSULTANT") {
      where.assignments = { some: { consultantId: id } };
    }
    const projects = await prisma.project.findMany({
      where,
      include: {
        assignments: true,
        customer: true,
        milestones: true,
        payments: true,
      },
    });
    res.json(projects);
  } catch (err) {
    next(err);
  }
}

export async function getProjectById(req, res, next) {
  try {
    const project = await prisma.project.findUnique({
      where: { id: req.params.id },
      include: {
        assignments: true,
        customer: true,
        milestones: true,
        payments: true,
        files: true,
        messages: true,
      },
    });
    if (!project) return res.status(404).json({ message: "Project not found" });
    // RBAC: allow only assigned users/admin/customer
    if (
      req.user.role !== "ADMIN" &&
      project.customerId !== req.user.id &&
      !project.assignments.some(
        (a) =>
          a.developerId === req.user.id ||
          a.consultantId === req.user.id
      )
    ) {
      return res.status(403).json({ message: "Forbidden" });
    }
    res.json(project);
  } catch (err) {
    next(err);
  }
}

export async function updateProject(req, res, next) {
  try {
    const { id: userId, role } = req.user;
    const project = await prisma.project.findUnique({ where: { id: req.params.id } });
    if (!project) return res.status(404).json({ message: "Project not found" });

    if (
      role !== "ADMIN" &&
      project.customerId !== userId &&
      !(await prisma.assignment.findFirst({
        where: {
          projectId: project.id,
          OR: [
            { developerId: userId },
            { consultantId: userId },
          ],
        },
      }))
    ) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const updated = await prisma.project.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function deleteProject(req, res, next) {
  try {
    await prisma.project.delete({ where: { id: req.params.id } });
    res.json({ message: "Project deleted" });
  } catch (err) {
    next(err);
  }
}

export async function assignUsersToProject(req, res, next) {
  try {
    const { developerId, consultantId } = req.body;
    const projectId = req.params.id;
    const assignment = await prisma.assignment.upsert({
      where: { projectId },
      update: { developerId, consultantId },
      create: { projectId, developerId, consultantId },
    });
    res.json(assignment);
  } catch (err) {
    next(err);
  }
}

export async function adminUpdateProject(req, res, next) {
  try {
    const data = req.body;
    const updated = await prisma.project.update({
      where: { id: req.params.id },
      data,
    });
    res.json(updated);
  } catch (err) {
    next(err);
  }
}
