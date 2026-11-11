
import { MongoClient, Db } from "mongodb";

let client: MongoClient | null = null;
let db: Db | null = null;

export const connectDB = async (): Promise<Db> => {
    try {
        const uri = process.env.MONGODB_URI;
        const dbName = process.env.DB_NAME;

        if (!uri || !dbName) {
            throw new Error("MongoDB environment variables are missing");
        }

        client = new MongoClient(uri);

        await client.connect();

        db = client.db(dbName);

        console.log("MongoDB connected successfully");

        return db;
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        throw error;
    }
};

export const ensureDB = async (): Promise<Db> => {
    if (db) {
        return db;
    }

    return connectDB();
};

export const getDB = (): Db => {
    if (!db) {
        throw new Error("Database is not connected");
    }

    return db;
};

export const closeDB = async (): Promise<void> => {
    if (client) {
        await client.close();
        client = null;
        db = null;
    }
};
