import { Router } from "express";
import { ObjectId } from "mongodb";
import { getDB } from "../config/db.js";
import { Property } from "../models/property.js";

const router = Router();

const COLLECTION = "properties";
const PEOPLES_COLLECTION = "peoples";

const validateProperty = (body: any): string | null => {
    if (!body || typeof body !== "object") {
        return "Request body is required";
    }

    const requiredStrings: [string, unknown][] = [
        ["title", body.title],
        ["propertyType", body.propertyType],
        ["furnished", body.furnished],
        ["description", body.description],
    ];

    for (const [name, value] of requiredStrings) {
        if (typeof value !== "string" || value.trim() === "") {
            return `${name} is required`;
        }
    }

    if (typeof body.price !== "number" || body.price <= 0) {
        return "price must be a positive number";
    }

    if (body.currency !== "BDT") {
        return "currency must be 'BDT'";
    }

    if (body.pricePeriod !== "MONTH" && body.pricePeriod !== "YEAR") {
        return "pricePeriod must be 'MONTH' or 'YEAR'";
    }

    if (body.status !== "Available" && body.status !== "Ocupied") {
        return "status must be 'Available' or 'Ocupied'";
    }

    const location = body.location;
    if (
        !location ||
        typeof location.address !== "string" || location.address.trim() === "" ||
        typeof location.area !== "string" || location.area.trim() === "" ||
        typeof location.city !== "string" || location.city.trim() === "" ||
        typeof location.country !== "string" || location.country.trim() === ""
    ) {
        return "location (address, area, city, country) is required";
    }

    const specs = body.specifications;
    const specNumbers = ["bedrooms", "bathrooms", "area", "balconies", "floor", "totalFloors", "parkingSpaces"] as const;
    if (
        !specs ||
        specNumbers.some((key) => typeof specs[key] !== "number") ||
        typeof specs.areaUnit !== "string" || specs.areaUnit.trim() === ""
    ) {
        return "specifications (bedrooms, bathrooms, area, areaUnit, balconies, floor, totalFloors, parkingSpaces) are required";
    }

    if (!body.images || typeof body.images.cover !== "string" || body.images.cover.trim() === "") {
        return "images.cover is required";
    }

    const landlord = body.landlord;
    if (
        !landlord ||
        typeof landlord.name !== "string" || landlord.name.trim() === "" ||
        typeof landlord.phone !== "string" || landlord.phone.trim() === ""
    ) {
        return "landlord (name, phone) is required";
    }

    const availability = body.availability;
    if (
        !availability ||
        typeof availability.availableFrom !== "string" || availability.availableFrom.trim() === "" ||
        typeof availability.minimumStay !== "number"
    ) {
        return "availability (availableFrom, minimumStay) is required";
    }

    return null;
};

router.get("/", async (_req, res) => {
    try {
        const db = getDB();
        const properties = await db.collection(COLLECTION).find({}).toArray();

        res.json({
            success: true,
            count: properties.length,
            data: properties
        });
    } catch (error) {
        console.error("Failed to fetch properties:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch properties"
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            res.status(400).json({
                success: false,
                message: "Invalid property id"
            });
            return;
        }

        const db = getDB();
        const property = await db.collection(COLLECTION).findOne({ _id: new ObjectId(id) });

        if (!property) {
            res.status(404).json({
                success: false,
                message: "Property not found"
            });
            return;
        }

        res.json({
            success: true,
            data: property
        });
    } catch (error) {
        console.error("Failed to fetch property:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch property"
        });
    }
});

router.post("/", async (req, res) => {
    try {
        const error = validateProperty(req.body);
        if (error) {
            res.status(400).json({
                success: false,
                message: error
            });
            return;
        }

        const now = new Date().toISOString();

        const newProperty: Property = {
            ...req.body,
            createdAt: now,
            updatedAt: now
        };

        const db = getDB();
        const result = await db.collection(COLLECTION).insertOne(newProperty);

        await db.collection(PEOPLES_COLLECTION).updateOne(
            { phone: newProperty.landlord.phone },
            {
                $set: {
                    name: newProperty.landlord.name,
                    phone: newProperty.landlord.phone,
                    role: "Landlord",
                    updatedAt: now
                },
                $setOnInsert: { createdAt: now }
            },
            { upsert: true }
        );

        const createdProperty = await db.collection(COLLECTION).findOne({ _id: result.insertedId });

        res.status(201).json({
            success: true,
            message: "Property created successfully",
            data: createdProperty
        });
    } catch (error) {
        console.error("Failed to create property:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create property"
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            res.status(400).json({
                success: false,
                message: "Invalid property id"
            });
            return;
        }

        const db = getDB();
        const result = await db.collection(COLLECTION).deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            res.status(404).json({
                success: false,
                message: "Property not found"
            });
            return;
        }

        res.json({
            success: true,
            message: "Property deleted successfully"
        });
    } catch (error) {
        console.error("Failed to delete property:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete property"
        });
    }
});

export default router;
