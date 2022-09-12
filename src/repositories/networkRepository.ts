import { prisma } from "../config/database.js";
import { CreateNetworkData } from "../services/networkServices.js";

export async function getAll(userId: number) 
{
  return prisma.network.findMany({ where: { userId } })
}
export async function getOne(userId: number, networkId: number) 
{
  return prisma.network.findFirst({ where: { userId, id: networkId } })
}
export async function insertNetwork(userId: number, network: CreateNetworkData) 
{
  return prisma.network.create({ data: {...network, userId } })
}
export async function deleteNetwork(id: number) 
{
  return prisma.network.delete({ where: { id } })
}