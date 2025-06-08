import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function uploadFile(req, res, next) {
  try {
    const { originalname, path } = req.file;
    const file = await prisma.file.create({
      data: {
        url: path, // In production, store S3/GCS URL
        name: originalname,
        projectId: req.params.projectId,
        uploadedById: req.user.id,
      },
    });
    res.status(201).json(file);
  } catch (err) {
    next(err);
  }
}

export async function getFilesByProject(req, res, next) {
  try {
    const files = await prisma.file.findMany({
      where: { projectId: req.params.projectId },
    });
    res.json(files);
  } catch (err) {
    next(err);
  }
}

export async function deleteFile(req, res, next) {
  try {
    await prisma.file.delete({ where: { id: req.params.fileId } });
    res.json({ message: "File deleted" });
  } catch (err) {
    next(err);
  }
}
