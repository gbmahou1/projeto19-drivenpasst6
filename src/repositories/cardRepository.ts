import { prisma } from "../config/database.js";
import { CreateCardData } from "../services/cardServices.js";

export async function getAll(userId: number) 
{
  return prisma.card.findMany({ where: { userId } })
}
export async function getCard(userId: number, cardId: number) 
{
  return prisma.card.findFirst({ where: { userId, id: cardId } })
}
export async function getTitle(userId: number, title: string) 
{
  return prisma.card.findFirst({ where: { userId, title } })
}
export async function insertCard(userId: number, card: CreateCardData) 
{
  return prisma.card.create({data: {...card, userId }})
}
export async function deleteCard(id: number) 
{
  return prisma.card.delete({ where: { id } });
}