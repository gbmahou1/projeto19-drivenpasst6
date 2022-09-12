import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { findId } from "../repositories/userRepository.js";

dotenv.config();

export async function authenticate(req: Request, res: Response, next: NextFunction) {
  const exists = req.headers["authorization"];
  if(!exists)
  {
    throw { type: "not_found"}
  }
  const token = exists.replace("Bearer ", "");
  if(!token)
  {
    throw { type: "not_found" }
  }
  try 
  {
    const JWT_SECRET = process.env.JWT_SECRET;
    const { userId } = jwt.verify(token, JWT_SECRET) as { userId: number };
    const user = await findId(userId);
    res.locals.user = user;
    next();
  } catch 
  {
    throw { type: "bad_request" }
  }
}