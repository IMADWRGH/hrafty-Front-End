import { Address } from "./Address.model";

export interface Seller {
    id?: number;
    nb_license?: number;
    image?: string;
    sexe?: string;
    phone?: string;
    site?: string;
    addressId?: Address
}