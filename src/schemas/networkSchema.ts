import joi from "joi";
import { CreateNetworkData } from "../services/networkServices";

export const networkSchema = joi.object<CreateNetworkData>({
  title: joi.string().required(),
  network: joi.string().required(),
  password: joi.string().required()
});
