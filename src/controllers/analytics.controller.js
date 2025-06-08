import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getSummaryAnalytics(req, res, next) {
  try {
    const projectsCount = await prisma.project.count();
    const usersCount = await prisma.user.count();
    const paymentsTotal = await prisma.payment.aggregate({ _sum: { amount: true } });
    res.json({
      projectsCount,
      usersCount,
      paymentsTotal: paymentsTotal._sum.amount || 0,
    });
  } catch (err) {
    next(err);
  }
}
