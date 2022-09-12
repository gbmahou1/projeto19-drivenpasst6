import { SafeNote } from "@prisma/client";
import { Request, Response } from "express";
import * as safeNoteServices from "../services/safeNoteServices.js";

export async function createSafeNote(req: Request, res: Response) 
{
  const {user} = res.locals;
  const credential = req.body;

  await safeNoteServices.createSafeNote(user, credential);
  res.sendStatus(201);
}
export async function deleteSafeNote(req: Request, res: Response) 
{
  const safeNoteId = parseInt(req.params.id);
  if(isNaN(safeNoteId)) 
  {
    res.sendStatus(422); 
  }
  const { user } = res.locals;
  await safeNoteServices.deleteSafeNote(user, safeNoteId);
  res.sendStatus(200);
}
export async function getOne(req: Request, res: Response) 
{
  const { user } = res.locals;
  const safeNoteId = parseInt(req.params.id);
  if(isNaN(safeNoteId)) 
  {
    res.sendStatus(422); 
  }
  const safeNote = await safeNoteServices.getOne(user.id, safeNoteId);
  res.send(safeNote);
}
export async function getAll(req: Request, res: Response) 
{
  const { user } = res.locals;
  const safeNotes = await safeNoteServices.getAll(user.id);
  res.send(safeNotes);
}
