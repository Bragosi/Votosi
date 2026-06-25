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
    // 1. Check cookies OR the Authorization Header (Mobile App Standard)
    let token = req.cookies?.jwt;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "User not logged in" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
    };

    if (!decoded?.userId) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // 2. CRITICAL FIX: Look for a VOTER first, then fall back to Admin if needed
    let user = await prisma.voter.findUnique({
      where: { id: decoded.userId },
      select: { id: true },
    });

    let role: "ADMIN" | "OFFICER" | "VOTER" = "VOTER";

    // If not found in voters, check admin table
    if (!user) {
      const adminUser = await prisma.admin.findUnique({
        where: { id: decoded.userId },
        select: { id: true, role: true },
      });

      if (!adminUser) {
        return res.status(404).json({ message: "User not found" });
      }
      
      user = adminUser;
      role = adminUser.role as "ADMIN" | "OFFICER";
    }

    req.user = {
      id: user.id,
      role: role,
    };

    next();
  } catch (error: any) {
    console.log("Error in protectRoute middleware:", error.message);
    return res.status(501).json({ message: "Authorization failed" });
  }
};