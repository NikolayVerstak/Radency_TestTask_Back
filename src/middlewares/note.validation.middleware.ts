import { Request, Response, NextFunction } from "express";
import { validationError } from "../helpers/customErrors.js";
import { AnySchema } from "yup";

const validateRequest =
    (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validate(req.body, { abortEarly: false });
            next();
        } catch (error) {
            next(validationError(error));
        }
    };

export default validateRequest;
