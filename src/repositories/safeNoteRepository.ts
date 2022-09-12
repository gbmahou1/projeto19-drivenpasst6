import { CreateSafeNoteData } from "../services/safeNoteServices.js";
import { prisma } from "./../config/database.js";

export async function getAll(userId: number) 
{
  return prisma.safeNote.findMany({
    where: { userId }
  });
}
export async function getOne(userId: number, safeNoteId: number) 
{
  return prisma.safeNote.findFirst({where: { userId, id: safeNoteId }})
}
export async function getTitle(userId: number, title: string) 
{
  return prisma.safeNote.findFirst({ where: { userId, title }})
}
export async function insertSafeNote(userId: number, safeNote: CreateSafeNoteData) 
{
  return prisma.safeNote.create({ data: {...safeNote, userId }})
}
export async function deleteSafeNote(id: number) {
  return prisma.safeNote.delete({ where: { id } });
}