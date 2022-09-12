import {Router} from "express";
import { createSafeNote, deleteSafeNote, getAll, getOne } from "../controllers/safeNoteController.js";
import { authenticate } from "../middlewares/authenticator";
import { validateSchema } from "../middlewares/validateSchema";
import { safeNoteSchema } from "../schemas/safeNoteSchema.js";

const safeNoteRouter = Router();

safeNoteRouter.use(authenticate);
safeNoteRouter.get("/safenotes", getAll);
safeNoteRouter.get("/safenotes/:id", getOne);
safeNoteRouter.post("/safenotes/", validateSchema(safeNoteSchema), createSafeNote);
safeNoteRouter.delete("/safenotes/:id", deleteSafeNote);

export default safeNoteRouter;