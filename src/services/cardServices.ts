import { User, Card } from "@prisma/client";
import * as cardRepository from "../repositories/cardRepository.js";
import Cryptr from "cryptr";
import dotenv from "dotenv";

dotenv.config();

const cryptr = new Cryptr(process.env.CRYPTR_SECRET);

export type CreateCardData = Omit<Card, "id">;

export async function getAll(userId: number) 
{
  const cards = await cardRepository.getAll(userId);
  return cards.map(card => {
    return {...card, password: cryptr.decrypt(card.password), securityCode: cryptr.decrypt(card.securityCode)}
  })
}
export async function getCard(userId: number, cardId: number) 
{
  const card = await cardRepository.getCard(userId, cardId);
  if(!card)
  {
    throw { type: "not_found"}
  }
  return {...card, password: cryptr.decrypt(card.password), securityCode: cryptr.decrypt(card.securityCode)}
}
export async function createCard(user: User, card: CreateCardData) 
{
  const existingCard = await cardRepository.getTitle(user.id, card.title);
  if(existingCard)
  {
    throw { type: "bad_request"}
  }
  const cardInfos: CreateCardData = {...card, password: cryptr.encrypt(card.password), securityCode: cryptr.encrypt(card.securityCode)}
  await cardRepository.insertCard(user.id, cardInfos);
}
export async function deleteCard(user: User, cardId: number) 
{
  await getCard(user.id, cardId);
  await cardRepository.deleteCard(cardId);
}