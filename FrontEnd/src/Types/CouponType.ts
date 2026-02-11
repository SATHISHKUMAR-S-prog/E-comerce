import { Cart } from "./CartType";

export interface CouponState{
    coupons: Coupon[],
    cart: Cart | null,
    loading:boolean,
    error:string | null,
    couponCreated: boolean,
    couponApplied:boolean,
}

export interface Coupon {
    id:number;
    code:string;
    discountPercentage:number;
    validityStartDate:string;
    validityEndDate:string;
    minimumOrderValue:number;
    active:boolean;
}