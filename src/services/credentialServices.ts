import { User, Credential } from "@prisma/client";
import * as credentialRepository from "../repositories/credentialRepository.js";
import Cryptr from "cryptr";
import dotenv from "dotenv";

dotenv.config();

const cryptr = new Cryptr(process.env.CRYPTR_SECRET);

export type CreateCredentialData = Omit<Credential, "id">;

export async function getAll(userId: number) 
{
  const credentials = await credentialRepository.getAll(userId);
  return credentials.map(credential => {
    const { password } = credential;
    return {...credential, password: cryptr.decrypt(password)}
  })
}
export async function getOne(userId: number, credentialId: number) 
{
  const credential = await credentialRepository.getOne(userId, credentialId);
  if(!credential)
   {
    throw { type: "not_found" }
   }
  return {...credential, password: cryptr.decrypt(credential.password)}
}
export async function createCredential(user: User, credential: CreateCredentialData) 
{
  const existingCredential = await credentialRepository.getTitle(user.id, credential.title);
  if(existingCredential)
  {
    throw { type: "bad_request" }
  }
  const credencialPassword = credential.password;
  const credentialInfos = {...credential, password: cryptr.encrypt(credencialPassword)}
  await credentialRepository.insertCredential(user.id, credentialInfos);
}
export async function deleteCredential(user: User, credentialId: number) 
{
  await getOne(user.id, credentialId);
  await credentialRepository.deleteCredential(credentialId);
}