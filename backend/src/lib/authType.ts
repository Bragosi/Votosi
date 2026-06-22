import { Request } from "express";

export interface AuthUser {
  id: string;
  role: "ADMIN" | "OFFICER" | "VOTER";
}

export interface AuthRequest extends Request {
  user?: AuthUser;
}