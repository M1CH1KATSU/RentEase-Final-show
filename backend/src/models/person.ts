export interface Person {
    name: string;
    phone: string;
    email?: string;
    role: "Landlord" | "Tenant";
    createdAt: string;
    updatedAt: string;
}
