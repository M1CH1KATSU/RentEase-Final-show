export interface Application {
    propertyId: string;
    propertyTitle: string;

    applicant: {
        name: string;
        email: string;
        phone: string;
    };

    message?: string;

    status: "Pending" | "Approved" | "Rejected";

    createdAt: string;
    updatedAt: string;
}
