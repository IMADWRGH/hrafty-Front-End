import { Image } from "./Image.model";
export interface Product {
    id?: number;
    images?: Image[];
    name: string;
    description: string;
    price: number;
    category: string;
    sellerId: number;
}