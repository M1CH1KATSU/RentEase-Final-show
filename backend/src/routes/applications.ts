import { Router } from "express";
import { ObjectId } from "mongodb";
import { getDB } from "../config/db.js";
import { Application } from "../models/application.js";

const router = Router();

const COLLECTION = "applications";
const PROPERTIES_COLLECTION = "properties";
const PEOPLES_COLLECTION = "peoples";

router.post("/", async (req, res) => {
    try {
        const body = req.body;

        if (!body || typeof body !== "object") {
            res.status(400).json({
                success: false,
                message: "Request body is required"
            });
            return;
        }

        const { propertyId } = body;
        if (typeof propertyId !== "string" || !ObjectId.isValid(propertyId)) {
            res.status(400).json({
                success: false,
                message: "Valid propertyId is required"
            });
            return;
        }

        const applicant = body.applicant;
        if (
            !applicant ||
            typeof applicant.name !== "string" || applicant.name.trim() === "" ||
            typeof applicant.email !== "string" || !/^\S+@\S+\.\S+$/.test(applicant.email) ||
            typeof applicant.phone !== "string" || applicant.phone.trim() === ""
        ) {
            res.status(400).json({
                success: false,
                message: "applicant (name, email, phone) is required"
            });
            return;
        }

        const db = getDB();

        const property = await db.collection(PROPERTIES_COLLECTION).findOne({ _id: new ObjectId(propertyId) });

        if (!property) {
            res.status(404).json({
                success: false,
                message: "Property not found"
            });
            return;
        }

        if (property.status === "Ocupied") {
            res.status(409).json({
                success: false,
                message: "This property is occupied, applications are not accepted"
            });
            return;
        }

        const now = new Date().toISOString();

        const newApplication: Application = {
            propertyId,
            propertyTitle: property.title,
            applicant: {
                name: applicant.name,
                email: applicant.email,
                phone: applicant.phone
            },
            message: typeof body.message === "string" && body.message.trim() !== "" ? body.message : undefined,
            status: "Pending",
            createdAt: now,
            updatedAt: now
        };

        const result = await db.collection(COLLECTION).insertOne(newApplication);

        await db.collection(PEOPLES_COLLECTION).updateOne(
            { phone: newApplication.applicant.phone },
            {
                $set: {
                    name: newApplication.applicant.name,
                    email: newApplication.applicant.email,
                    phone: newApplication.applicant.phone,
                    role: "Tenant",
                    updatedAt: now
                },
                $setOnInsert: { createdAt: now }
            },
            { upsert: true }
        );

        const createdApplication = await db.collection(COLLECTION).findOne({ _id: result.insertedId });

        res.status(201).json({
            success: true,
            message: "Application submitted successfully",
            data: createdApplication
        });
    } catch (error) {
        console.error("Failed to submit application:", error);
        res.status(500).json({
            success: false,
            message: "Failed to submit application"
        });
    }
});

router.get("/", async (req, res) => {
    try {
        const db = getDB();

        const query: { propertyId?: string } = {};
        if (typeof req.query.propertyId === "string") {
            if (!ObjectId.isValid(req.query.propertyId)) {
                res.status(400).json({
                    success: false,
                    message: "Invalid propertyId"
                });
                return;
            }
            query.propertyId = req.query.propertyId;
        }

        const applications = await db.collection(COLLECTION).find(query).toArray();

        res.json({
            success: true,
            count: applications.length,
            data: applications
        });
    } catch (error) {
        console.error("Failed to fetch applications:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch applications"
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            res.status(400).json({
                success: false,
                message: "Invalid application id"
            });
            return;
        }

        const db = getDB();
        const application = await db.collection(COLLECTION).findOne({ _id: new ObjectId(id) });

        if (!application) {
            res.status(404).json({
                success: false,
                message: "Application not found"
            });
            return;
        }

        res.json({
            success: true,
            data: application
        });
    } catch (error) {
        console.error("Failed to fetch application:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch application"
        });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            res.status(400).json({
                success: false,
                message: "Invalid application id"
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

        if (body.status !== undefined) {
            if (!["Pending", "Approved", "Rejected"].includes(body.status)) {
                res.status(400).json({
                    success: false,
                    message: "status must be 'Pending', 'Approved' or 'Rejected'"
                });
                return;
            }
            update.status = body.status;
        }

        if (body.applicant !== undefined) {
            const applicant = body.applicant;
            if (
                typeof applicant.name !== "string" || applicant.name.trim() === "" ||
                typeof applicant.email !== "string" || !/^\S+@\S+\.\S+$/.test(applicant.email) ||
                typeof applicant.phone !== "string" || applicant.phone.trim() === ""
            ) {
                res.status(400).json({
                    success: false,
                    message: "applicant (name, email, phone) is invalid"
                });
                return;
            }
            update.applicant = {
                name: applicant.name,
                email: applicant.email,
                phone: applicant.phone
            };
        }

        if (body.message !== undefined) {
            update.message = typeof body.message === "string" && body.message.trim() !== "" ? body.message : undefined;
        }

        if (Object.keys(update).length === 0) {
            res.status(400).json({
                success: false,
                message: "Nothing to update, provide status, applicant or message"
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
                message: "Application not found"
            });
            return;
        }

        res.json({
            success: true,
            message: "Application updated successfully",
            data: result
        });
    } catch (error) {
        console.error("Failed to update application:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update application"
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            res.status(400).json({
                success: false,
                message: "Invalid application id"
            });
            return;
        }

        const db = getDB();
        const result = await db.collection(COLLECTION).deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            res.status(404).json({
                success: false,
                message: "Application not found"
            });
            return;
        }

        res.json({
            success: true,
            message: "Application deleted successfully"
        });
    } catch (error) {
        console.error("Failed to delete application:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete application"
        });
    }
});

export default router;
