import { Router } from "express";
import { ObjectId } from "mongodb";
import { getDB } from "../config/db.js";

const router = Router();

const COLLECTION = "peoples";
const PROPERTIES_COLLECTION = "properties";
const APPLICATIONS_COLLECTION = "applications";

const getPersonDetails = async (phone: string) => {
    const db = getDB();

    const properties = await db.collection(PROPERTIES_COLLECTION).find({ "landlord.phone": phone }).toArray();
    const applications = await db.collection(APPLICATIONS_COLLECTION).find({ "applicant.phone": phone }).toArray();

    const appliedPropertyIds = [...new Set(applications.map((app) => app.propertyId))];
    const appliedProperties = await db
        .collection(PROPERTIES_COLLECTION)
        .find({ _id: { $in: appliedPropertyIds.map((id) => new ObjectId(id)) } })
        .toArray();

    return { properties, applications, appliedProperties };
};

router.get("/", async (_req, res) => {
    try {
        const db = getDB();
        const peoples = await db.collection(COLLECTION).find({}).toArray();

        const data = await Promise.all(
            peoples.map(async (person) => {
                const details = await getPersonDetails(person.phone);
                return { ...person, ...details };
            })
        );

        res.json({
            success: true,
            count: data.length,
            data
        });
    } catch (error) {
        console.error("Failed to fetch peoples:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch peoples"
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            res.status(400).json({
                success: false,
                message: "Invalid person id"
            });
            return;
        }

        const db = getDB();
        const person = await db.collection(COLLECTION).findOne({ _id: new ObjectId(id) });

        if (!person) {
            res.status(404).json({
                success: false,
                message: "Person not found"
            });
            return;
        }

        const details = await getPersonDetails(person.phone);

        res.json({
            success: true,
            data: { ...person, ...details }
        });
    } catch (error) {
        console.error("Failed to fetch person:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch person"
        });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            res.status(400).json({
                success: false,
                message: "Invalid person id"
            });
            return;
        }

        const body = req.body;

        if (!body || typeof body !== "object") {
            res.status(400).json({
                success: false,
                message: "Request body is required"
            });
            return;
        }

        const update: Record<string, unknown> = {};

        if (body.name !== undefined) {
            if (typeof body.name !== "string" || body.name.trim() === "") {
                res.status(400).json({
                    success: false,
                    message: "name must be a non-empty string"
                });
                return;
            }
            update.name = body.name;
        }

        if (body.phone !== undefined) {
            if (typeof body.phone !== "string" || body.phone.trim() === "") {
                res.status(400).json({
                    success: false,
                    message: "phone must be a non-empty string"
                });
                return;
            }
            update.phone = body.phone;
        }

        if (body.email !== undefined) {
            if (body.email !== null && (typeof body.email !== "string" || !/^\S+@\S+\.\S+$/.test(body.email))) {
                res.status(400).json({
                    success: false,
                    message: "email must be a valid email address"
                });
                return;
            }
            update.email = body.email;
        }

        if (body.role !== undefined) {
            if (body.role !== "Landlord" && body.role !== "Tenant") {
                res.status(400).json({
                    success: false,
                    message: "role must be 'Landlord' or 'Tenant'"
                });
                return;
            }
            update.role = body.role;
        }

        if (Object.keys(update).length === 0) {
            res.status(400).json({
                success: false,
                message: "Nothing to update, provide name, phone, email or role"
            });
            return;
        }

        update.updatedAt = new Date().toISOString();

        const db = getDB();
        const result = await db.collection(COLLECTION).findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: update },
            { returnDocument: "after" }
        );

        if (!result) {
            res.status(404).json({
                success: false,
                message: "Person not found"
            });
            return;
        }

        res.json({
            success: true,
            message: "Person updated successfully",
            data: result
        });
    } catch (error) {
        console.error("Failed to update person:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update person"
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            res.status(400).json({
                success: false,
                message: "Invalid person id"
            });
            return;
        }

        const db = getDB();
        const result = await db.collection(COLLECTION).deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            res.status(404).json({
                success: false,
                message: "Person not found"
            });
            return;
        }

        res.json({
            success: true,
            message: "Person deleted successfully"
        });
    } catch (error) {
        console.error("Failed to delete person:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete person"
        });
    }
});

export default router;
