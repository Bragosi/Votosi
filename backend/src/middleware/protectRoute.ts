import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";

interface AuthRequest extends Request {
  user?: any;
}

export const protectRoute = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies?.jwt;

    if (!token) {
      return res.status(401).json({ message: "User not logged in" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
    };

    if (!decoded?.userId) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const user = await prisma.admin.findUnique({
      where: {
        id: decoded.userId,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("COOKIES:", req.cookies);
    console.log("HEADERS:", req.headers.authorization);
    req.user = user;

    next();
  } catch (error: any) {
    console.log("Error in protectRoute middleware:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
