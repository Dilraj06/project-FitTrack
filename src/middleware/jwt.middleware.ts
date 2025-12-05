// src/middleware/jwt.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/jwt';

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: { uid: string };
    }
  }
}

export function verifyJwt(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader =
      req.header("authorization") ||
      req.header("Authorization") ||
      "";

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Missing Authorization header" });
    }

    const token = authHeader.replace("Bearer ", "").trim();
    const decoded = jwt.verify(token, JWT_SECRET) as any;

    // We only care about uid
    req.user = { uid: decoded.uid || decoded.sub };

    return next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
