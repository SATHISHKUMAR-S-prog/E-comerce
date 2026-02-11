import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { api } from "../../Config/Api"
import { Product } from "../../Types/ProductType"

export const fetchProductById = createAsyncThunk<any,any>(
    "/products/fetchProductById",
    async(productId, {rejectWithValue}) => {
        try {
            const response = await api.get(`/products/${productId}`)
            // console.log("product data -", response.data)
            return response.data
        } catch (error:any) {
            console.log("product error - - - " , error)
            rejectWithValue(error.message)
        }
    }
)

export const searchProduct = createAsyncThunk(
    "/products/searchProduct",
    async(query, {rejectWithValue}) => {
        try {
            const response = await api.get(`/products/search`,{
                params:{
                    query
                }
            })
            // console.log("search product data -", response.data)
            return response.data
        } catch (error:any) {
            console.log("search product error - - - " , error)
            rejectWithValue(error.message)
        }
    }
)

export const fetchAllProducts = createAsyncThunk<any,any>(
    "/products/fetchAllProducts",
    async(params, {rejectWithValue}) => {
        try {
            const response = await api.get(`/products`,{
                params:{
                    ...params,
                    paeNumber:params.pageNumber || 0
                }
            })
            // console.log("all product data -", response.data, "params - -",params)
            return response.data
        } catch (error:any) {
            console.log("all product error - - - " , error)
            rejectWithValue(error.message)
        }
    }
)

interface ProductState{
    product:Product | null;
    products: Product[];
    totalPages: number;
    searchProduct:Product[];
    loading:boolean;
    error:string | null | undefined | any;
}

const initialState:ProductState={
    product: null,
    products: [],
    totalPages: 1,
    searchProduct: [],
    loading:false,
    error:null,
}

const productSlice = createSlice({
        name:"products",
        initialState,
        reducers:{},
        extraReducers(builder) {
           builder.addCase(fetchProductById.pending,(state) =>{
                state.loading=true
            })
            builder.addCase(fetchProductById.fulfilled,(state,action)=>{
                state.loading=false
                state.product=action.payload
            })
            builder.addCase(fetchProductById.rejected,(state,action)=>{
                state.loading=false
                state.error = action.payload
            })

            builder.addCase(fetchAllProducts.pending,(state) =>{
                state.loading=true
            })
            builder.addCase(fetchAllProducts.fulfilled,(state,action)=>{
                state.loading=false
                state.products=action.payload.content
            })
            builder.addCase(fetchAllProducts.rejected,(state,action)=>{
                state.loading=false
                state.error = action.payload
            })

            builder.addCase(searchProduct.pending,(state) =>{
                state.loading=true
            })
            builder.addCase(searchProduct.fulfilled,(state,action)=>{
                state.loading=false
                state.searchProduct=action.payload
            })
            builder.addCase(searchProduct.rejected,(state,action)=>{
                state.loading=false
                state.error = action.payload
            })
        },
})

export default productSlice.reducer;