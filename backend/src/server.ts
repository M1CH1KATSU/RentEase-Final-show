import "dotenv/config";

import app from "./app.js";
import { connectDB, closeDB } from "./config/db.js";

const PORT = Number(process.env.PORT) || 5000;

const startServer = async () => {
    try {
        await connectDB();

        const server = app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

        const shutdown = async () => {
            console.log("Shutting down server...");

            server.close(async () => {
                await closeDB();
                process.exit(0);
            });
        };

        process.on("SIGINT", shutdown);
        process.on("SIGTERM", shutdown);

    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();