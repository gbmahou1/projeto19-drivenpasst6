import {Router} from "express";

import { createNetworkCtr, deleteNetworkCtr, getAllNetworks, getOneNetwork } from "../controllers/networkController.js";
import { authenticate } from "../middlewares/authenticator.js";
import { validateSchema} from "../middlewares/validateSchema.js";
import { networkSchema } from "../schemas/networkSchema.js";

const networkRouter = Router();

networkRouter.use(authenticate);
networkRouter.get("/networks", getAllNetworks);
networkRouter.get("/networks/:id", getOneNetwork);
networkRouter.post("/networks", validateSchema(networkSchema), createNetworkCtr);
networkRouter.delete("/networks/:id", deleteNetworkCtr);

export default networkRouter;