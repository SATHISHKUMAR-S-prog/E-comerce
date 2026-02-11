import { Product } from "./ProductType";
import { User } from "./UserType";

export interface CartItem{
    id:number;
    cart?:Cart;
    product:Product;
    sizes:string;
    quantity:number;
    mrpPrice:number;
    sellingPrice: number;
    userId:number
}

export interface Cart {
    id:number;
    user:User;
    cartItem:CartItem[];
    totalSellingPrice:number;
    totalItem:number;
    totalMrpPrice:number;
    discount:number;
    couponCode:string | null;
}