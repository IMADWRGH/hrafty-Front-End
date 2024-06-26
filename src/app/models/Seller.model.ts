export interface Seller {
    id?: number;
    nb_license?: number;
    image?: string;
    sexe?: string;
    phone?: string;
    site?: string;
    addressId?: {
        street?: string;
        name_regional?: string;
        name_city?: string;
        shop_number?: string;
    }
}