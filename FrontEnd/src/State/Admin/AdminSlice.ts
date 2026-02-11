import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../Config/Api";
import { HomeCategory, HomeData } from "../../Types/HomeCategoryType";
import { Seller } from "../../Types/SellerType";

export const updateHomeCategory = createAsyncThunk<HomeCategory,
{
    id:number,
    data:HomeCategory
}>("/homeCategory/updateHomeCategory",
    async ({id,data},{rejectWithValue})=> {
        try {
            const response = await api.patch(`/admin/home-category/${id}`,data)
          
            return response.data
        } catch (error:any) {
            console.log("update home category ",error)
            return rejectWithValue(error.response.data || "Failed to update home category")
        }
    }
)

export const fetchHomeCategory = createAsyncThunk<HomeCategory[]>("/homeCategory/fetchHomeCategory",
    async (_,{rejectWithValue})=> {
        try {
            const response = await api.get(`/admin/home-category`)
            return response.data
        } catch (error:any) {
            console.log("home category ",error)
            return rejectWithValue(error.response.data || "Failed to get home category")
        }
    }
)


interface HomeCategoryState{
    categories:HomeCategory[],
    loading:boolean,
    error:string | null,
    categoryUpdated:boolean,
}

const initialState: HomeCategoryState={
    categories:[],
    loading:false,
    error: null,
    categoryUpdated:false,
}

const HomeCategorySlice = createSlice({
    name:"homeCategory",
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder.addCase(updateHomeCategory.pending,(state)=>{
            state.loading=true
            state.error= null
            state.categoryUpdated=false
        })
        .addCase(updateHomeCategory.fulfilled,(state,action:PayloadAction<HomeCategory>)=>{
            state.loading=false
            state.categoryUpdated=true
            const index = state.categories.findIndex((category) => category.id === Number( action.payload.categoryId))
            if(index !== -1){
                state.categories[index] = action.payload
            } else {
                state.categories.push(action.payload) // add new item in home category
            }
        })
        .addCase(updateHomeCategory.rejected,(state,action)=>{
            state.loading=false
            state.error= action.payload as string
            state.categoryUpdated=false
        })
        .addCase(fetchHomeCategory.pending,(state)=>{
            state.loading=true
            state.error= null
            state.categoryUpdated=false
        })
        .addCase(fetchHomeCategory.fulfilled,(state,action)=>{
            state.loading=false
            state.categories = action.payload
        })
        .addCase(fetchHomeCategory.rejected,(state,action)=>{
            state.loading=false
            state.error= action.payload as string
        })
    },
})

export default HomeCategorySlice.reducer