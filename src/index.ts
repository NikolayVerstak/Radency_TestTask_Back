import cors from "cors";
import express from "express";

import { initRoutes } from "./routes/routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initRoutes(app);

const port = 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export { app };
