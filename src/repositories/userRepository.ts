import { prisma } from "./../config/database.js";
import { CreateUserData } from "../services/userServices.js";

export async function newUser(data: CreateUserData)
{
    return prisma.user.create({ data })
}
export async function findId(id: number)
{
    return prisma.user.findFirst({where: { id }});
}
export async function findEmail(email: string)
{
    return prisma.user.findFirst({where: {email }});
}

