import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";
import { AuthRequest } from "../lib/authType.js";


export const protectRoute = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
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
      where: { id: decoded.userId },
      select: {
        id: true,
        role: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = {
      id: user.id,
      role: user.role as "ADMIN" | "OFFICER" | "VOTER",
    };

    next();
  } catch (error: any) {
    console.log("Error in protectRoute middleware:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};