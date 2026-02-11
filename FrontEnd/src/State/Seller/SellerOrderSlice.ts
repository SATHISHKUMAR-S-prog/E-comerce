import { createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import { Order, OrderStatus } from "../../Types/OrderType";
import { api } from "../../Config/Api";

export const fetchSellerOrders = createAsyncThunk<Order[],string>("/sellerOrder/fetchSellerOrders",
    async (jwt,{rejectWithValue}) => {
        try {
            const response = await api.get("/api/seller/orders",{
                headers:{
                    Authorization:`Bearer ${jwt}`
                }
            })
            // console.log("fetch seller order", response.data)
            return response.data
        } catch (error:any) {
            console.log("fetch seller orders ",error)
            return rejectWithValue(error.response.data || "Failed to fetch seller orders")
        }
    }
)

export const updateSellerOrder = createAsyncThunk<Order,
{
    jwt:string,
    orderId:number,
    orderstatus:OrderStatus
}
>("/sellerOrder/updateSellerOrder",
    async ({jwt,orderId,orderstatus},{rejectWithValue}) => {
        try {
            const response = await api.patch(`/api/seller/orders/${orderId}/status/${orderstatus}`,null,{
                headers:{
                    Authorization:`Bearer ${jwt}`
                }
            })
            // console.log("order Status", response.data)
            return response.data
        } catch (error:any) {
            console.log(" orders status",error)
            return rejectWithValue(error.response.data || "Failed to update seller orders")
        }
    }
)

export const deleteOrder = createAsyncThunk<Order,
{
    jwt:string,
    orderId:number,
}
>("/sellerOrder/deleteOrder",
    async ({jwt,orderId},{rejectWithValue}) => {
        try {
            const response = await api.delete(`/api/seller/orders/${orderId}/delete`,{
                headers:{
                    Authorization:`Bearer ${jwt}`
                }
            })
            // console.log("delete order", response.data)
            return response.data
        } catch (error:any) {
            console.log("delete orders status",error)
            return rejectWithValue(error.response.data || "Failed to delete seller orders")
        }
    }
)


interface SellerSatate{
    orders:Order[];
    loading:boolean;
    error:string | null;
}

const initialState:SellerSatate={
    orders:[],
    loading:false,
    error:null
}

const sellerOrderSlice = createSlice({
    name:"sellerOrder",
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder.addCase(fetchSellerOrders.pending,(state) => {
            state.loading=true
            state.error=null
        })
        .addCase(fetchSellerOrders.fulfilled,(state,action:PayloadAction<Order[]>)=>{
            state.orders=action.payload
            state.loading=false
        })
        .addCase(fetchSellerOrders.rejected,(state,action)=>{
            state.error=action.payload as string
            state.loading=false
        })
        .addCase(updateSellerOrder.pending,(state) => {
            state.loading=true
            state.error=null
        })
        .addCase(updateSellerOrder.fulfilled,(state,action:PayloadAction<Order>)=>{
            state.loading=false
            const index = state.orders.findIndex( order => order.id === action.payload.id)
            if(index !== -1){
                state.orders[index] = action.payload
            }
        })
        .addCase(updateSellerOrder.rejected,(state,action)=>{
            state.error=action.payload as string
            state.loading=false
        })
        .addCase(deleteOrder.pending,(state) => {
            state.loading=true
            state.error=null
        })
        .addCase(deleteOrder.fulfilled,(state,action)=>{
            state.loading=false
            state.orders=state.orders.filter( order => order.id !== action.meta.arg.orderId)
        })
        .addCase(deleteOrder.rejected,(state,action)=>{
            state.error=action.payload as string
            state.loading=false
        })
    },
})

export default sellerOrderSlice.reducer