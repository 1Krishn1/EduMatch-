import jwt from "jsonwebtoken";

export const JWT_SECRET = process.env.JWT_SECRET || "edumatch-ict930-dev-secret";

export function signToken(user) {
  return jwt.sign({ id: user.id, role: user.role, email: user.email, name: user.name }, JWT_SECRET, {
    expiresIn: "7d",
  });
}

export function authRequired(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: "Please log in to continue." });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ message: "Session expired. Please log in again." });
  }
}

export function adminRequired(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required." });
  }
  next();
}
