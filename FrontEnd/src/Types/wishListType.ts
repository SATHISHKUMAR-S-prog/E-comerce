import { Product } from "./ProductType";
import { User } from "./UserType";

export interface WishList {
    id:number;
    user:User;
    products:Product[];
}

export interface WishListState {
    wishList : WishList | null ;
    loading: boolean;
    error: string | null;
}

export interface AddProductToWishListPayload {
    wishListId:number;
    productId:number;
}