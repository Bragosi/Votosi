import { prisma } from "../../lib/prisma.js";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { generateToken } from "../../lib/generateToken.js";

export const AdminSignup = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // validation
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long",
      });
    }

    // check existing user
    const user = await prisma.adminLogin.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const newAdmin = await prisma.adminLogin.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    console.log("🔥 Admin signup route hit");
    // generate token
    generateToken(newAdmin.id, res);

    return res.status(201).json({
      id: newAdmin.id,
      email: newAdmin.email,
    });
  } catch (error) {
    console.log("Error in Register Controller", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
