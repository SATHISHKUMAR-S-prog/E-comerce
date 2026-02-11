import { createAsyncThunk, createSlice ,PayloadAction} from "@reduxjs/toolkit";
import { WishList, WishListState } from "../../Types/wishListType";
import { api } from "../../Config/Api";
import { isNullishCoalesce } from "typescript";

const initialState:WishListState={
    wishList:null,
    loading:false,
    error:null
}

export const getWishListByUserId = createAsyncThunk("/wishlist/getWishListByUserId",
    async (_,{rejectWithValue}) => {
        try {
            const response = await api.get('/api/wishlist',{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`
                }
            })
            // console.log("wishlist data - - ",response.data)
            return response.data
        } catch (error:any) {
            console.log("wishlist error - - ",error)
            return rejectWithValue(error.response.data.message || "Failed to fetch wishlist")
        }
    }
)

export const addProductToWishList = createAsyncThunk("/wishlist/addProductToWishList",
    async ({productId}:{productId:number} ,{rejectWithValue}) => {
        try {
            const response = await api.post(`/api/wishlist/add-product/${productId}`, { },{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`
                }
            })
            // console.log("add product - - ",response.data)
            return response.data
        } catch (error:any) {
            console.log("add product error - - ",error)
            return rejectWithValue(error.response.data.message || "Failed to add product to wishlist")
        }
    }
)

const wishlistSlice = createSlice({
    name:"wishlist",
    initialState,
    reducers:{
        resetWishListState:(state)=>{ 
            state.wishList=null,
            state.loading=false;
            state.error=null
        }
    },
    extraReducers(builder) {
        builder.addCase(getWishListByUserId.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(getWishListByUserId.fulfilled,(state,action: PayloadAction<WishList>)=>{
            state.wishList=action.payload
            state.loading=false
        })
        .addCase(getWishListByUserId.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload as string
        })
        .addCase(addProductToWishList.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(addProductToWishList.fulfilled,(state,action: PayloadAction<WishList>)=>{
            state.wishList=action.payload
            state.loading=false
        })
        .addCase(addProductToWishList.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload as string
        })
    },
})

export const {resetWishListState} = wishlistSlice.actions

export default wishlistSlice.reducer