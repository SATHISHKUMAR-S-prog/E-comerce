import { createAsyncThunk, createSlice ,PayloadAction} from "@reduxjs/toolkit";
import { ApiResponse, Deal, DealsState } from "../../Types/DealType";
import { api } from "../../Config/Api";

const initialState: DealsState={
    deals:[],
    loading:false,
    error: null ,
    dealCreated: false,
    dealUpdated: false
}

export const createDeals = createAsyncThunk("/deals/createDeals",
    async (deal:any,{rejectWithValue})=> {
        try {
            const response = await api.post(`/admin/deals`,deal,{
                headers:{
                    "Content-Type": "application/json",
                    Authorization:`Bearer ${localStorage.getItem("jwt")}`
                }
            })
         
            return response.data
        } catch (error:any) {
            console.log("create deal ",error)
            return rejectWithValue(error.response.data || "Failed to create deal")
        }
    }
)

export const getAllDeals = createAsyncThunk("/deals/getAllDeals",
    async (_,{rejectWithValue})=> {
        try {
            const response = await api.get(`/admin/deals`,{
                headers:{
                    "Content-Type": "application/json",
                    Authorization:`Bearer ${localStorage.getItem("jwt")}`
                }
            })
            // console.log("get all deals ", response.data)
            return response.data
        } catch (error:any) {
            console.log("get all deals ",error)
            return rejectWithValue(error.response.data || "Failed to get all deals")
        }
    }
)

export const deleteDeals = createAsyncThunk<ApiResponse,{id:number}>("/deals/deleteDeals",
    async (id,{rejectWithValue})=> {
        try {
            const response = await api.delete(`/admin/deals/${id}`,{
                headers:{
                    "Content-Type": "application/json",
                    Authorization:`Bearer ${localStorage.getItem("jwt")}`
                }
            })
           
            return response.data
        } catch (error:any) {
            console.log("delete deal ",error)
            return rejectWithValue(error.response.data || "Failed to delete deal")
        }
    }
)

export const updateDeals = createAsyncThunk<any,{id:number,deal:Deal}>("/deals/updateDeals",
    async ({id,deal},{rejectWithValue})=> {
        try {
            const response = await api.patch(`/admin/deals/${id}`,deal,{
                headers:{
                    "Content-Type": "application/json",
                    Authorization:`Bearer ${localStorage.getItem("jwt")}`
                }
            })
            // console.log("update deal ", response.data)
            return response.data
        } catch (error:any) {
            console.log("update deal ",error)
            return rejectWithValue(error.response.data || "Failed to update deal")
        }
    }
)

const dealsSlice = createSlice({
    name:"deals",
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder.addCase(createDeals.pending,(state)=>{
            state.loading=true
            state.error=null
            state.dealCreated=false
        })
        .addCase(createDeals.fulfilled,(state,action)=>{
            state.loading=false
            state.dealCreated=true
            state.deals.push(action.payload)
        })
        .addCase(createDeals.rejected,(state,action)=>{
            state.loading=false
            state.error =action.payload as string
            state.dealCreated=false
        })
        .addCase(updateDeals.pending,(state) => {
            state.loading=true
            state.error=null
            state.dealUpdated = false
        })
        .addCase(updateDeals.fulfilled,(state,action:PayloadAction<Deal>)=>{
            state.loading=false
            const index = state.deals.findIndex( deal => deal.id === action.payload.id)
            if(index !== -1){
                state.deals[index] = action.payload
            }
            state.dealUpdated = true
        })
        .addCase(updateDeals.rejected,(state,action)=>{
            state.error=action.payload as string
            state.loading=false
            state.dealUpdated = false
        })
        .addCase(deleteDeals.pending,(state) => {
            state.loading=true
            state.error=null
        })
        .addCase(deleteDeals.fulfilled,(state,action)=>{
            state.loading=false
            state.deals=state.deals.filter( deal => deal.id !== action.meta.arg.id)
        })
        .addCase(deleteDeals.rejected,(state,action)=>{
            state.error=action.payload as string
            state.loading=false
        })
        .addCase(getAllDeals.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(getAllDeals.fulfilled,(state,action)=>{
            state.loading=false
            state.deals = (action.payload)
        })
        .addCase(getAllDeals.rejected,(state,action)=>{
            state.loading=false
            state.error =action.payload as string
        })
    },
})

export default dealsSlice.reducer