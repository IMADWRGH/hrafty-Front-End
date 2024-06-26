import { Customer } from "./Customer.model";
import { Seller } from "./Seller.model";
import { User } from "./User.model";

export interface Auth {
    user?: User;
    customer?: Customer;
    seller?: Seller;
}