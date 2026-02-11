import { Order } from "./OrderType";
import { Seller } from "./SellerType";
import { User } from "./UserType";

export interface Transaction{
    id:number;
    customer:User;
    order:Order;
    seller:Seller;
    date:string;
}