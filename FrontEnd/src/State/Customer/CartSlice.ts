import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart, CartItem } from "../../Types/CartType";
import { api } from "../../Config/Api";
import { act } from "react";
import { sumCartItemMrpPrice, sumCartItemSellingPrice } from "../../Utils/sumCartItemMrpPrice";
import { applyCoupon } from "./CouponSlice";
import { RootState } from "../Store";

interface cartState {
    cart : Cart | null;
    loading: boolean;
    error:string | null;
}

const initialState:cartState = {
    cart:null,
    loading:false,
    error:null
}

const CART_URL = "/api/cart"

export const fetchUserCart = createAsyncThunk<Cart,any>("/cart/fetchUserCart",
    async (jwt : string,{rejectWithValue}) => {
        try {
            const response = await api.get(`${CART_URL}`,{
                headers: {
                    Authorization:`Bearer ${jwt}`
                }
            })
          
            // console.log("user cart data -", response.data)
            return response.data
        } catch (error:any) {
            console.log("error user cart  --- ",error.response)
            return rejectWithValue("failed to fetch cart")
        }
    }
)

interface AddItemRequest{
    productId: number | undefined;
    sizes: string ;
    quantity: number;
}

export const addItemToCart = createAsyncThunk<CartItem,{jwt:string | null; request:AddItemRequest}>("/cart/addItemToCart",
    async (args, {rejectWithValue}) => {
        const {jwt,request} = args
    try {
        const response = await api.put(`${CART_URL}/add`,request,{
            headers: {
                Authorization:`Bearer ${jwt}`
            }
        })
        // console.log("add cart data -", response.data)
        return response.data
    } catch (error:any) {
        console.log("error add cart --- ",error.response)
        return rejectWithValue("failed to add cart item")
    }
})

export const deleteCartItem = createAsyncThunk<any,{jwt:string; cartItemId:number}>("/cart/deleteCartItem",
    async (args, {rejectWithValue}) => {
        const {jwt,cartItemId} = args
    try {
        const response = await api.delete(`${CART_URL}/item/${cartItemId}`,{
            headers: {
                Authorization:`Bearer ${jwt}`
            }
        })
        // console.log("delete cart data -", response.data)
        return response.data
    } catch (error:any) {
        console.log("error delete cart --- ",error.response)
        return rejectWithValue(error.response.data.message || "failed to delete cart item")
    }
})

export const updateCartItem = createAsyncThunk<any,{jwt:string | null; cartItemId:number;cartItem:any}>("/cart/updateCartItem",
    async (args, {rejectWithValue}) => {
        const {jwt,cartItemId,cartItem} = args
    try {
        const response = await api.put(`${CART_URL}/item/${cartItemId}`,cartItem,{
            headers: {
                Authorization:`Bearer ${jwt}`
            }
        })
        // console.log("update cart data -", response.data)
        return response.data
    } catch (error:any) {
        console.log("error update cart--- ",error.response)
        return rejectWithValue(error.response.data.message || "failed to update cart item")
    }
})

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        resetCartState: (state) => {
            state.cart= null;
            state.loading = false;
            state.error = null
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchUserCart.pending,(state) => {
            state.loading = true
            state.error = null
        })
        .addCase(fetchUserCart.fulfilled,(state,action: PayloadAction<Cart>) => {
            state.cart = action.payload
            state.loading = false
        })
        .addCase(fetchUserCart.rejected,(state,action) => {
            state.loading = false
            state.error = action.payload as string
        })
        .addCase(addItemToCart.pending,(state) => {
            state.loading = true
            state.error = null
        })
        .addCase(addItemToCart.fulfilled,(state,action:PayloadAction<CartItem>) => {
            if(state.cart){
                state.cart.cartItem.push(action.payload)
            }9
            state.loading = false
        })
        .addCase(addItemToCart.rejected,(state,action) => {
            state.loading = false
            state.error = action.payload as string
        })
        .addCase(deleteCartItem.pending,(state) => {
            state.loading = true
            state.error = null
        })
        .addCase(deleteCartItem.fulfilled,(state,action) => {
            if(state.cart){
                state.cart.cartItem = state.cart.cartItem.filter( 
                    (item:CartItem) => item.id !== action.meta.arg.cartItemId )
                    
                const mrpPrice = sumCartItemMrpPrice(state.cart?.cartItem || [])
                const sellingPrice = sumCartItemSellingPrice(state.cart?.cartItem || [])
                state.cart.totalMrpPrice = mrpPrice
                state.cart.totalSellingPrice = sellingPrice
            }
            state.loading = false
        })
        .addCase(deleteCartItem.rejected,(state,action) => {
            state.loading = false
            state.error = action.payload as string
        })
        .addCase(updateCartItem.pending,(state,action)=>{
            state.loading = true 
            state.error = null
        })
        .addCase(updateCartItem.fulfilled,(state,action)=>{
            if (state.cart) {
                const cartItemIndex = state.cart.cartItem.findIndex(
                    (item) => item.id === Number(action.meta.arg.cartItemId)
                );
                if (cartItemIndex !== -1) {
                    state.cart.cartItem[cartItemIndex] = {
                    ...state.cart.cartItem[cartItemIndex],
                    ...action.payload,
                    };
                }
            
                const mrpPrice = sumCartItemMrpPrice(state.cart?.cartItem || [] );
                const sellingPrice = sumCartItemSellingPrice(state.cart?.cartItem || []);
                console.log(mrpPrice, "sellin",sellingPrice)
                state.cart.totalMrpPrice = mrpPrice;
                state.cart.totalSellingPrice = sellingPrice;
                }
            
                state.loading = false;
        })
        .addCase(updateCartItem.rejected,(state,action) => {
            state.loading = false
            state.error = action.payload as string
        })
        .addCase(applyCoupon.fulfilled,(state,action) => {
            state.cart = action.payload
            state.loading = false
        })
    },
})

export default cartSlice.reducer

export const {resetCartState } = cartSlice.actions
// export const selectCart = (state: RootState) => state.cart.cart
// export const selectCartLoading = (state: RootState) => state.cart.loading
// export const selectCartError = (state: RootState) => state.cart.error