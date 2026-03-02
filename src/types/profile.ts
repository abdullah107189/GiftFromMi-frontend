

export interface IUser {
    id: number;
    first_name: string;
    last_name: string;
    dob: string | null;
    email: string;
    provider_id: string | null;
    avatar: string | null;
    role: "Customer" | "Admin" | "Seller";
    gender: "Male" | "Female" | "Other";
    account_status: number;
    is_deleted: number;
    avatarUrl: string | null;
    profile?: IUserProfile | null;
}

export interface IUserProfile {
    id: number;
    user_id: number;
    phone: string;
    address: string;
    shipping_address: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
}