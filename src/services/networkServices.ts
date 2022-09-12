import { Network, User } from "@prisma/client";
import * as networkRepository from "../repositories/networkRepository.js";
import Cryptr from "cryptr";
import dotenv from "dotenv";

dotenv.config();

const cryptr = new Cryptr(process.env.CRYPTR_SECRET);


export type CreateNetworkData = Omit<Network, "id">;

export async function getAll(userId: number) 
{
  const networks = await networkRepository.getAll(userId);
  return networks.map(network => {
    return {...network, password: cryptr.decrypt(network.password) }
  });
}
export async function getOne(userId: number, networkId: number) 
{
  const network = await networkRepository.getOne(userId, networkId);
  if(!network)
  {
    throw {type: "not_found"};
  }

  return {
    ...network,
    password: cryptr.decrypt(network.password)
  }
}
export async function createNetwork(user: User, network: CreateNetworkData) 
{
  const networkInfos = {...network, password: cryptr.encrypt(network.password)};
  await networkRepository.insertNetwork(user.id, networkInfos);
}
export async function deleteNetwork(user: User, networkId: number) {
  await getOne(user.id, networkId);
  await networkRepository.deleteNetwork(networkId);
}