import { Request, Response } from "express";
import { createUser, login } from "../services/userServices.js";

export async function signUp(req: Request, res: Response)
{
    const newUserData = req.body;
    await createUser(newUserData);
    res.sendStatus(201);
}
export async function signIn(req: Request, res: Response)
{
    const loginData = req.body;
    const token = await login(loginData);
    res.send({ token });
}