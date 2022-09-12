import {Router} from "express";
import { createCard, deleteCard, getAll, getOne } from "../controllers/cardController.js";
import { authenticate } from "../middlewares/authenticator.js";
import { validateSchema } from "../middlewares/validateSchema";
import { cardSchema } from "../schemas/cardSchema.js";

const cardRouter = Router();

cardRouter.use(authenticate);
cardRouter.get("/cards", getAll);
cardRouter.get("/cards/:id", getOne)
cardRouter.post("/cards", validateSchema(cardSchema), createCard);
cardRouter.delete("/cards/:id", deleteCard);

export default cardRouter;