import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../Config/Api";
import { Product } from "../../Types/ProductType";

export const fetchSellerProduct = createAsyncThunk<Product[],any>(
    "/sellerProduct/fetchSellerProduct",
    async(jwt, {rejectWithValue}) => {
        try {
            const response = await api.get("/api/seller/products",{
                headers: {
                    Authorization:`Bearer ${jwt}`
                }
            })
            // console.log("product data -", response.data)
            return response.data
        } catch (error) {
            console.log("seller product error - - - " , error)
        }
    }
)

export const createProduct = createAsyncThunk<Product,{request:any,jwt:string | null}>(
   "/sellerProduct/createProduct",
   async(args, {rejectWithValue}) => {
    const {request,jwt} = args;
    try {
        const response = await api.post("/api/seller/products",request,{
            headers: {
                Authorization:`Bearer ${jwt}`
            }
        })
        // console.log("product created -", response.data)
        return response.data
    } catch (error) {
        console.log("create product error - - - " , error)
    }
}
)

interface SellerProductState{
    products:Product[];
    loading:boolean;
    error:string | null | undefined;
}

const initialState: SellerProductState = {
    products:[],
    loading:false,
    error:null
}

const sellerProductSlice = createSlice({
    name:"sellerProduct",
    initialState,
    reducers:{},
    extraReducers(builder) {
       builder.addCase(fetchSellerProduct.pending,(state) =>{
            state.loading=true
        })
        builder.addCase(fetchSellerProduct.fulfilled,(state,action)=>{
            state.loading=false
            state.products=action.payload
        })
        builder.addCase(fetchSellerProduct.rejected,(state,action)=>{
            state.loading=false
            state.error = action.error.message
        }),

        builder.addCase(createProduct.pending,(state) =>{
            state.loading=true
        })
        builder.addCase(createProduct.fulfilled,(state,action)=>{
            state.loading=false
            state.products.push(action.payload)
        })
        builder.addCase(createProduct.rejected,(state,action)=>{
            state.loading=false
            state.error = action.error.message
        })
    },
}) 

export default sellerProductSlice.reducer;