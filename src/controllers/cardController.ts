import { Request, Response } from "express";
import * as cardServices from "../services/cardServices.js";

export async function getAll(req: Request, res: Response) 
{
  const { user } = res.locals;
  const cards = await cardServices.getAll(user.id);
  res.send(cards);
}
export async function getOne(req: Request, res: Response) 
{
  const { user } = res.locals;
  const cardId = parseInt(req.params.id);
  if(isNaN(cardId)) 
  {
    res.sendStatus(422);
  }
  const card = await cardServices.getCard(user.id, cardId);
  res.send(card);
}
export async function createCard(req: Request, res: Response) 
{
  const { user } = res.locals;
  const card = req.body;
  await cardServices.createCard(user, card);
  res.sendStatus(201);
}
export async function deleteCard(req: Request, res: Response) 
{
  const cardId = parseInt(req.params.id);
  if(isNaN(cardId)) 
  {
    res.sendStatus(422);
  }
  const { user } = res.locals;
  await cardServices.deleteCard(user, cardId);
  res.sendStatus(200);
}