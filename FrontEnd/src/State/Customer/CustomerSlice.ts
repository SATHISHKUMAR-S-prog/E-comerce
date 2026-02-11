import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { HomeCategory, HomeData } from "../../Types/HomeCategoryType"
import { api } from "../../Config/Api"

export const createHomeCategories = createAsyncThunk<HomeData,HomeCategory[]>("/home/createHomeCategories",
    async (homeCategories,{rejectWithValue})=> {
        try {
            const response = await api.post(`/home/categories`,homeCategories)
            // console.log("home PageData ", response.data)
            return response.data
        } catch (error:any) {
            console.log("home PageData",error)
            return rejectWithValue(error.response.data || "Failed to get home Page Data")
        }
    }
)

interface HomeState{
    homepageData: HomeData | null,
    homeCategories : HomeCategory[],
    loading:boolean,
    error:string | null,
}

const initialState: HomeState={
    homepageData: null,
    homeCategories : [],
    loading:false,
    error: null,
}

const CustomerSlice = createSlice({
    name:"home",
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder.addCase(createHomeCategories.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(createHomeCategories.fulfilled,(state,action) =>{
            state.loading=false
            state.homepageData = action.payload
        })
        .addCase(createHomeCategories.rejected,(state,action)=>{
            state.loading=false
            state.error= action.payload as string
        })
    },
})

export default CustomerSlice.reducer