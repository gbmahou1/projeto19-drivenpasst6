import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { findEmail, newUser } from "../repositories/userRepository.js";

export type CreateUserData = Omit<User, "id">;

dotenv.config();

export async function login(data: CreateUserData)
{
    const user = await findEmail(data.email);
    if(!user)
    {
        throw { type: "unauthorized" };
    }
    const passwordCorrect = bcrypt.compareSync(data.password, user.password);
    if(!passwordCorrect)
    {
        throw { type: "unauthorized" };
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    return token;
}

export async function createUser(user: CreateUserData)
{
    const userAlreadyExists = await findEmail(user.email);
    if(userAlreadyExists)
    {
        throw { type: "unauthorized" };
    }
    const key = 23;
    const hashedPassword = bcrypt.hashSync(user.password, key);
    await newUser({ ...user, password: hashedPassword });
}

