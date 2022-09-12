import { Request, Response } from "express";
import { Network } from "@prisma/client";
import { getAll, getOne, createNetwork, deleteNetwork } from "../services/networkServices.js";

export async function getAllNetworks(req: Request, res: Response) 
{
  const { user } = res.locals;
  const networks = await getAll(user.id);
  res.send(networks);
}
export async function getOneNetwork(req: Request, res: Response) 
{
  const { user } = res.locals;
  const networkId = parseInt(req.params.id);
  if(isNaN(networkId)) 
  {
    res.sendStatus(422);
  }
  const network = await getOne(user.id, networkId)
  res.send(network);
}
export async function createNetworkCtr(req: Request, res: Response) 
{
  const { user } = res.locals;
  const network = req.body;
  await createNetwork(user, network);
  res.sendStatus(201);
}
export async function deleteNetworkCtr(req: Request, res: Response) 
{
  const networkId = parseInt(req.params.id);
  if(isNaN(networkId)) 
  {
    res.sendStatus(422);
  }
  const { user } = res.locals;
  await deleteNetwork(user, networkId);
  res.sendStatus(200);
}