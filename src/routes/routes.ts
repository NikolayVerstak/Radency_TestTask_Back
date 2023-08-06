import express from "express";
import { router as noteRoutes } from "./noteRoutes.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const initRoutes = (app: express.Application) => {
    app.use("/notes", noteRoutes);
    app.use(responseMiddleware);
};

export { initRoutes };
