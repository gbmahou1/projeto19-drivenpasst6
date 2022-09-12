import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { userSchema } from "../schemas/userSchema.js";
import {signIn, signUp} from "./../controllers/authController.js";

const authRouter = Router();

authRouter.post("/signup", validateSchema(userSchema), signUp);
authRouter.post("/signin", validateSchema(userSchema), signIn);

export default authRouter;