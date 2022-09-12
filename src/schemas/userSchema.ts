import Joi from "joi";
import { CreateUserData } from "../services/userServices.js";

export const userSchema = Joi.object<CreateUserData>({
    email: Joi.string().email().required(),
    password: Joi.string().min(10).required()
})