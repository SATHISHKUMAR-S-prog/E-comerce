import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { thunk } from "redux-thunk";
import sellerSlice from "./Seller/SellerSlice"
import sellerProductSlice from "./Seller/SellerProductSlice"
import productSlice from "./Customer/ProductSlice"
import authSlice from "./AuthSlice"
import cartSlice from "./Customer/CartSlice"
import orderSlice from "./Customer/OrderSlice"
import wishlistSlice from "./Customer/WishListSlice"
import sellerOrderSlice from "./Seller/SellerOrderSlice"
import transactionSlice from "./Seller/TransactionSlice"
import homeCategorySlice from "./Admin/AdminSlice"
import customerSlice from "./Customer/CustomerSlice"
import dealsSlice from "./Admin/DealsSlice"
import couponSlice from "./Customer/CouponSlice"

const rootReducer = combineReducers({
    seller: sellerSlice,
    sellerProduct: sellerProductSlice,
    product: productSlice,
    auth:authSlice,
    cart:cartSlice,
    order:orderSlice,
    wishlist:wishlistSlice,
    customer: customerSlice,

    //seller slice
    sellerOrders:sellerOrderSlice,
    transaction:transactionSlice,
    //admin slice
    homeCategory:homeCategorySlice,
    deals:dealsSlice,
    coupon:couponSlice
})

const store = configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState>= useSelector

export default store