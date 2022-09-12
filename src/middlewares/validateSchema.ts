import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

export function validateSchema(schema: ObjectSchema)
{
    return (req: Request, res: Response, next:NextFunction) => {
        const validation = schema.validate(req.body);
        if (validation.error)
        {
            return res.sendStatus(422).send({ error: validation.error.message });
        }
        next();
    }
}