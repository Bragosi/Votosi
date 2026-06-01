// server.ts
import express from "express";
import cors from "cors";
import { prisma } from "./lib/prisma.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import voterAuthRoutes from "./routes/voterAuthRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

// 1. CORS MUST BE FIRST
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

// 2. Parsers next
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 3. Logger next (Ensures we catch everything coming through)
app.use((req, res, next) => {
  next();
});

// 4. API Routes LAST
app.use("/api/admin", authRoutes);
app.use("/api/voter", voterAuthRoutes);

app.listen(PORT, async () => {
  try {
    await prisma.$connect();
    console.log("Database connected");
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});