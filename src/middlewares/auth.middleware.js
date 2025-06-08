import jwt from "jsonwebtoken";

export function authenticateToken(req, res, next) {
  const token = req.cookies?.jwt || req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Auth required" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
}

export function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role))
      return res.status(403).json({ message: "Forbidden" });
    next();
  };
}
