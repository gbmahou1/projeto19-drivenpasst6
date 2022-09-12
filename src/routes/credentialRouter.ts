import { Router } from "express";
import { createCredential, deleteCredential, getOne, getAll } from "../controllers/credentialController.js";
import { authenticate } from "../middlewares/authenticator.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { credentialSchema } from "../schemas/credentialSchema.js";

const credentialRouter = Router();

credentialRouter.use(authenticate);
credentialRouter.get("/credentials", getAll);
credentialRouter.get("/credentials/:id", getOne);
credentialRouter.post("/credentials", validateSchema(credentialSchema), createCredential);
credentialRouter.delete("/credentials/:id", deleteCredential);

export default credentialRouter;

