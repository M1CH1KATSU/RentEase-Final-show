export interface Property {
    title: string;
    propertyType: string;
    price: number;
    currency: 'BDT';
    pricePeriod: "MONTH" | "YEAR";

    location: {
        address: string;
        area: string;
        city: string;
        country: string;
    };

    specifications: {
        bedrooms: number;
        bathrooms: number;
        area: number;
        areaUnit: string;
        balconies: number;
        floor: number;
        totalFloors: number;
        parkingSpaces: number;
    };

    images: {
        cover: string;
    };

    status: "Available" | "Ocupied";
    furnished: string;
    description: string;

    amenities?: string[];

    features?: {
        petFriendly: boolean;
        airConditioning: boolean;
        wifi: boolean;
        attachedBathroom: boolean;
    };

    landlord: {
        name: string;
        phone: string;
    };

    availability: {
        availableFrom: string;
        minimumStay: number;
    };

    createdAt: string;
    updatedAt: string;
}
