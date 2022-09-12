import joi from "joi";
import { CreateSafeNoteData } from "../services/safeNoteServices";

export const safeNoteSchema = joi.object<CreateSafeNoteData>({
  title: joi.string().max(50).required(),
  note: joi.string().max(1000).required()
});
