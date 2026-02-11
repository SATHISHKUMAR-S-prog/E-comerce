import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Cart } from "../../Types/CartType"
import { number } from "yup";
import { api } from "../../Config/Api";
import { Coupon, CouponState } from "../../Types/CouponType";
import { Console } from "console";

const COUPON_URL = "/api/coupon"

export const applyCoupon = createAsyncThunk
<Cart,{
    apply:string;
    code:string;
    orderValue:number;
    jwt:string;
}>("/coupon/applyCoupon",
    async ({apply, code, orderValue, jwt},{rejectWithValue}) => {
        try {
            const response = await api.post(`${COUPON_URL}/apply`,null,{
                params: {apply, code, orderValue},
                headers: { Authorization:`Bearer ${jwt}` }
            })
            // console.log("apply coupon -", response.data)
            return response.data
        } catch (error:any) {
            console.log("apply coupon error -- ", error.response)
            return rejectWithValue(error.response.data.message || "failed to apply coupon")
        }
    }
)

export const getAllCoupons = createAsyncThunk<Coupon[],any>("/coupon/getAllCoupons",
    async (jwt:string , {rejectWithValue}) => {
        try {
            const response = await api.get(`${COUPON_URL}/admin/all`,{
                headers: { 
                    "Content-Type": "application/json",
                    Authorization:`Bearer ${jwt}` 
                }
            })
            // console.log("get all coupon - " ,response.data)
            return response.data
        } catch (error:any) {
            console.log("get all coupon error - " ,error.response.data)
            return rejectWithValue(error.response.data || "Failed to fetch coupons")
        }
    }
) 

export const createCoupon = createAsyncThunk<Coupon,{coupon:Partial<Coupon>,jwt:string}>("/coupon/createCoupon",
    async ({coupon,jwt},{rejectWithValue}) => {
        try {
            const response = await api.post(`${COUPON_URL}/admin/create`,coupon,{
                headers:{
                    Authorization :`Bearer ${jwt}`
                }
            })
            return response.data
        } catch (error:any) {
            console.log("create coupon error - ",error)
            return rejectWithValue(error.response.data || "Failed to create coupon")
        }
    }
)

export const deleteCoupon = createAsyncThunk<any,{couponId:number,jwt:string}>("/coupon/deleteCoupon",
    async ({couponId,jwt},{rejectWithValue}) =>{
        try {
            const response = await api.delete(`${COUPON_URL}/admin/delete/${couponId}`,{
                headers:{
                    Authorization :`Bearer ${jwt}`
                }
            })
            // console.log("coupon deleted")
            return response
        } catch (error:any) {
            console.log("coupon delete error",error)
            return rejectWithValue(error.response)
        }
    }
)

const initialState: CouponState = {
    coupons: [],
    cart: null,
    loading:false,
    error:null,
    couponCreated: false,
    couponApplied:false,
}

const couponSlice = createSlice ({
    name:"coupon",
    initialState,
    reducers:{},
    extraReducers(builder) {
         builder.addCase(applyCoupon.pending,(state) => {
            state.loading = true
            state.error = null
            state.couponApplied = false
        })
        .addCase(applyCoupon.fulfilled,(state,action)=>{
            state.cart = action.payload
            state.loading = false
            if(action.meta.arg.apply == "true"){
                state.couponApplied = true
            }
            console.log("cart - - ", state.cart)
        })
        .addCase(applyCoupon.rejected,(state,action) =>{
            state.loading = false
            state.error = action.payload as string || "Failed to apply coupon"
            state.couponApplied = false
        })
        .addCase(getAllCoupons.pending,(state) => {
            state.loading = true
            state.error = null
        })
        .addCase(getAllCoupons.fulfilled,(state,action)=>{
            state.coupons = action.payload
            state.loading = false
        })
        .addCase(getAllCoupons.rejected,(state,action) =>{
            state.loading = false
            state.error = action.payload as string || "Failed to apply coupon"
        })
        .addCase(createCoupon.pending,(state) => {
            state.loading = true
            state.error = null
        })
        .addCase(createCoupon.fulfilled,(state,action)=>{
            state.coupons.push(action.payload)
            state.loading = false
        })
        .addCase(createCoupon.rejected,(state,action) =>{
            state.loading = false
            state.error = action.payload as string || "Failed to create coupon"
        })
        .addCase(deleteCoupon.fulfilled,(state,action)=>{
            state.coupons = state.coupons.filter((del) => del.id !== action.meta.arg.couponId )
            state.loading = false
        })
        .addCase(deleteCoupon.rejected,(state,action) =>{
            state.loading = false
            state.error = action.payload as string || "Failed to delete coupon"
        })
    },
})

export default couponSlice.reducer