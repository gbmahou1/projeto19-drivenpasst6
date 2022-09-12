import { CreateCredentialData } from "../services/credentialServices.js";
import { prisma } from "../config/database.js";

export async function getAll(userId: number) 
{
  return prisma.credential.findMany({ where: { userId } })
}
export async function getOne(userId: number, credencialId: number) 
{
  return prisma.credential.findFirst({ where: { userId, id: credencialId } })
}
export async function getTitle(userId: number, title: string) 
{
  return prisma.credential.findFirst({ where: { userId, title } })
}
export async function insertCredential(userId: number, credential: CreateCredentialData) 
{
  return prisma.credential.create({ data: {...credential, userId } })
}
export async function deleteCredential(id: number) 
{
  return prisma.credential.delete({ where: { id } });
}