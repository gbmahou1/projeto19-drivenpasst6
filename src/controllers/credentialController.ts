import { Credential } from "@prisma/client";
import { Request, Response } from "express";
import *  as credentialServices from "../services/credentialServices.js";

export async function getAll(req: Request, res: Response) 
{
  const { user } = res.locals;
  const credencials: Credential[] = await credentialServices.getAll(user.id);

  res.send(credencials);
}
export async function getOne(req: Request, res: Response) 
{
  const { user } = res.locals;
  const credentialId = parseInt(req.params.id);
  if(isNaN(credentialId)) {
    res.sendStatus(422);
  }
  const credential = await credentialServices.getOne(user.id, credentialId);
  res.send(credential);
}
export async function createCredential(req: Request, res: Response) 
{
  const {user} = res.locals;
  const credential = req.body;

  await credentialServices.createCredential(user, credential);
  res.sendStatus(201);
}
export async function deleteCredential(req: Request, res: Response) 
{
  const credentialId = parseInt(req.params.id);
  if(isNaN(credentialId)) {
    res.sendStatus(422);
  }
  const { user } = res.locals;
  await credentialServices.deleteCredential(user, credentialId);
  res.sendStatus(200);
}