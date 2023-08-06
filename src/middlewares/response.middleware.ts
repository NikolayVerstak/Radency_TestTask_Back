import { Request, Response, NextFunction } from "express";
import { CustomError } from "../helpers/customErrors.js";

const responseMiddleware = (data: any, req: Request, res: Response, next: NextFunction) => {
    if (data instanceof CustomError) {
        const code = data.code || 400;
        const errorMessage = data.message || "Unexpected error occurred";
        console.error(data);
        return res.status(code).send({ errorMessage });
    }

    return res.status(200).send(data);
};

export { responseMiddleware, CustomError };
