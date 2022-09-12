import { SafeNote, User } from "@prisma/client";
import * as safeNoteRepository from "../repositories/safeNoteRepository.js";

export type CreateSafeNoteData = Omit<SafeNote, "id">;

export async function getAll(userId: number) 
{
  const safeNotes = await safeNoteRepository.getAll(userId);
  return safeNotes;
}
export async function getOne(userId: number, safeNoteId: number) 
{
  const safeNote = await safeNoteRepository.getOne(userId, safeNoteId);
  if(!safeNote)
  {
    throw {type: "not_found"};
  }
  return safeNote;
}
export async function createSafeNote(user: User, safeNote: CreateSafeNoteData) 
{
  const existingCredential = await safeNoteRepository.getTitle(user.id, safeNote.title);
  if(existingCredential)
  {
    throw {type: "bad_request"};
  }
  await safeNoteRepository.insertSafeNote(user.id, safeNote);
}
export async function deleteSafeNote(user: User, safeNoteId: number) 
{
  await getOne(user.id, safeNoteId);
  await safeNoteRepository.deleteSafeNote(safeNoteId);
}