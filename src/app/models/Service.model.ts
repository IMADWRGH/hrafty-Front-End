import { Image } from "./Image.model";
export interface Service {
    id: number;
    name: string;
    description: string;
    images: Image[];
    price: number;
    category: string;
    status: boolean;
    sellerId: number;
}