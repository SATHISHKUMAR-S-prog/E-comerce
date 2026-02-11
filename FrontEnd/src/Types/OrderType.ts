import { Product } from "./ProductType";
import { Address, User } from "./UserType";

export interface OrderItem{
    id:number;
    order:Order;
    product:Product;
    sizes:string;
    quantity:number;
    mrpPrice:number;
    sellingPrice:number;
    userId:number;
}

export interface Order{
    id:number;
    orderId:number;
    user:User;
    sellerId:number;
    orderItems:OrderItem[];
    orderDate:string;
    shippingAddress:Address;
    paymentDetails:any;
    totalMrpPrice:number;
    totalSellingPrice?:number;
    totalItem:number;
    discount?:number;
    orderstatus:OrderStatus;
    deliveryDate:string;
    paymentMethod:PaymentMethod;
}

export interface OrderState{
    orders:Order[];
    orderItem:OrderItem | null;
    currentOrder: Order | null;
    paymentOrder: any | null;
    orderCancelled: boolean;
    loading: boolean;
    error:string | null
}

export enum OrderStatus {
    ARRIVING = 'ARRIVING',
    SHIPPED = "SHIPPED",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED",
    PLACED = "PLACED",
    CONFIRMED = "CONFIRMED"
}

export enum PaymentMethod{
    RAZORPAY = "RAZORPAY",
    STRIPE = "STRIPE",
    COD = "COD",
}