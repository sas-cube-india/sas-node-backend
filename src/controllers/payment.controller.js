import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createPayment(req, res, next) {
  try {
    const { amount } = req.body;
    const payment = await prisma.payment.create({
      data: {
        amount: parseFloat(amount),
        projectId: req.params.projectId,
        customerId: req.user.id,
        status: "Completed", // For demo, assume payment always succeeds
      },
    });
    res.status(201).json(payment);
  } catch (err) {
    next(err);
  }
}

export async function getPaymentsByProject(req, res, next) {
  try {
    const payments = await prisma.payment.findMany({
      where: { projectId: req.params.projectId },
    });
    res.json(payments);
  } catch (err) {
    next(err);
  }
}

export async function getAllPayments(req, res, next) {
  try {
    const payments = await prisma.payment.findMany();
    res.json(payments);
  } catch (err) {
    next(err);
  }
}
