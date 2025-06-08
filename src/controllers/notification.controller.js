// For demo, notifications are not stored in DB; you can add a Prisma model if needed.
export async function getNotifications(req, res, next) {
  res.json([
    { id: 1, message: "Welcome to the Freelancer Platform!", type: "info", createdAt: new Date() }
  ]);
}

export async function sendNotification(req, res, next) {
  res.status(201).json({ message: "Notification would be sent (not implemented)" });
}
