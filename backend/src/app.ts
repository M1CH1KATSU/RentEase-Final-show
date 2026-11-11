import express from "express";
import cors from "cors";

import propertiesRouter from "./routes/properties.js";
import applicationsRouter from "./routes/applications.js";
import peoplesRouter from "./routes/peoples.js";
import { ensureDB } from "./config/db.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(async (_req, _res, next) => {
    try {
        await ensureDB();
        next();
    } catch (error) {
        next(error);
    }
});

app.get("/", (_req, res) => {
    res.json({
        success: true,
        message: "Backend API is running"
    });
});

app.use("/api/properties", propertiesRouter);
app.use("/api/applications", applicationsRouter);
app.use("/api/peoples", peoplesRouter);

export default app;