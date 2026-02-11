import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order, OrderState } from "../../Types/OrderType";
import { api } from "../../Config/Api";
import { Address } from "../../Types/UserType";
import { stat } from "fs";

const initialState: OrderState={
    orders:[],
    orderItem: null,
    currentOrder: null,
    paymentOrder: null,
    orderCancelled: false,
    loading: false,
    error: null
}

const ORDER_URL = "/api/orders"

export const fetchUserOrderHistory = createAsyncThunk<Order[],string>("/orders/fetchUserOrderHistory",
    async (jwt:string , {rejectWithValue}) => {
        try {
            const response = await api.get(`${ORDER_URL}/user`,{
                headers:{
                    Authorization:`Bearer ${jwt}`
                }
            })
            // console.log("get order history -- ",response.data)
            return response.data
        } catch (error:any) {
            console.log("get order history -- ",error)
            return rejectWithValue(error.response.data.message || "Failed to fetch the orders")
        }
    }
)

export const fetchOrderById = createAsyncThunk<Order,{orderId:number;jwt:string}>("/orders/fetchOrderById",
    async ({orderId,jwt} , {rejectWithValue}) => {
        try {
            const response = await api.get(`${ORDER_URL}/${orderId}`,{
                headers:{
                    Authorization:`Bearer ${jwt}`
                }
            })
            // console.log("get order -- ",response.data)
            return response.data
        } catch (error:any) {
            console.log("get order -- ",error)
            return rejectWithValue(error.response.data.message || "Failed to fetch the order")
        }
    }
)

export const createOrder = createAsyncThunk<any,{address:Address;jwt:string;paymentGateway:string}>("/orders/createOrder",
    async ({address,jwt,paymentGateway} , {rejectWithValue}) => {
        try {
            const response = await api.post(`${ORDER_URL}`,address,{
                headers:{ Authorization:`Bearer ${jwt}`},
                params:{
                    paymentMethod:paymentGateway
                }
            })
            // console.log("order created  -- ",response.data)
            if(response.data.payment_link_url){
                window.location.href = response.data.payment_link_url
            }
            return response.data
        } catch (error:any) {
            console.log("create order -- ",error)
            return rejectWithValue(error.response.data.message || "Failed to create order")
        }
    }
)

export const fetchOrderItemById = createAsyncThunk<Order,{orderItemId:number;jwt:string}>("/orders/fetchOrderItemById",
    async ({orderItemId,jwt} , {rejectWithValue}) => {
        try {
            const response = await api.get(`${ORDER_URL}/item/${orderItemId}`,{
                headers:{
                    Authorization:`Bearer ${jwt}`
                }
            })
            // console.log("get orderItem -- ",response.data)
            return response.data
        } catch (error:any) {
            console.log("get orderItem -- ",error)
            return rejectWithValue(error.response.data.message || "Failed to fetch the orderItem")
        }
    }
)

export const paymentSuccess = createAsyncThunk<any,{paymentId:string;jwt:string;paymentLinkId:string}>("/orders/paymentSuccess",
    async ({paymentId,jwt,paymentLinkId} , {rejectWithValue}) => {
        try {
            const response = await api.get(`/api/payment/${paymentId}`,{
                headers:{ Authorization:`Bearer ${jwt}`},
                params:{paymentLinkId}
            })
            // console.log("payment success  -- ",response.data)
            return response.data
        } catch (error:any) {
            console.log("payment not success -- ",error)
            return rejectWithValue(error.response.data.message || "payment failed")
        }
    }
)

export const cancelorder = createAsyncThunk<Order,{orderId:number;jwt:string}>("/orders/cancelorder",
    async ({orderId,jwt} , {rejectWithValue}) => {
        try {
            const response = await api.put(`${ORDER_URL}/${orderId}/cancel`,{
                headers:{
                    Authorization:`Bearer ${jwt}`
                }
            })
            // console.log("get orderItem -- ",response.data)
            return response.data
        } catch (error:any) {
            console.log("get orderItem -- ",error.response)
            return rejectWithValue(error.response.data.message || "Failed to cancel the order")
        }
    }
)

const orderSlice = createSlice({
    name:"orders",
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder.addCase(fetchUserOrderHistory.pending,(state)=>{
            state.loading= true
            state.error= null
            state.orderCancelled=false
        })
        .addCase(fetchUserOrderHistory.fulfilled,(state,action:PayloadAction<Order[]>)=>{
            state.loading=false
            state.orders=action.payload
            
        })
        .addCase(fetchUserOrderHistory.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload as string
           
        })
        .addCase(fetchOrderById.pending,(state)=>{
            state.loading= true
            state.error= null
        })
        .addCase(fetchOrderById.fulfilled,(state,action:PayloadAction<Order>)=>{
            state.loading=false
            state.currentOrder=action.payload
           
        })
        .addCase(fetchOrderById.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload as string
        })
        .addCase(createOrder.pending,(state)=>{
            state.loading= true
            state.error= null
        })
        .addCase(createOrder.fulfilled,(state,action:PayloadAction<any>)=>{
            state.loading=false
            state.paymentOrder=action.payload
           
        })
        .addCase(createOrder.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload as string
        })
        .addCase(fetchOrderItemById.pending,(state)=>{
            state.loading= true
            state.error= null
        })
        .addCase(fetchOrderItemById.fulfilled,(state,action:PayloadAction<any>)=>{
            state.loading=false
            state.orderItem=action.payload
        })
        .addCase(fetchOrderItemById.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload as string
        })
        .addCase(paymentSuccess.pending,(state)=>{
            state.loading= true
            state.error= null
        })
        .addCase(paymentSuccess.fulfilled,(state,action:PayloadAction<any>)=>{
            state.loading=false
            console.log("payment successs:",action.payload)
        })
        .addCase(paymentSuccess.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload as string
        })
        .addCase(cancelorder.pending,(state)=>{
            state.loading= true
            state.error= null
            state.orderCancelled=false
        })
        .addCase(cancelorder.fulfilled,(state,action:PayloadAction<any>)=>{
            state.loading=false
            state.orders=state.orders.map((order)=>
                order.id === action.payload.id? action.payload : order
            )
            state.orderCancelled= true
            state.currentOrder= action.payload
        })
        .addCase(cancelorder.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload as string
        })
    },
})

export default orderSlice.reducer