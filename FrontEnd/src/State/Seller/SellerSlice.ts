import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../Config/Api";
import { boolean, string } from "yup";
import { AccountStatus, Seller } from "../../Types/SellerType";

export const getAllSellers = createAsyncThunk<Seller[],{status:AccountStatus,jwt:string | null}>("/sellers/getAllSellers", 
    async({status,jwt}, {rejectWithValue}) => {
        try {
            const response = await api.get("sellers",{
                headers: { Authorization:`Bearer ${jwt}`},
                params:{status}
            })
            // console.log("fetch seller profile ",response.data)
            return response.data
        } catch (error:any) {
            console.log("seller profile error - - - " , error)
            return rejectWithValue(error.response?.data || "Failed to seller by status");
        }
    }
)

export const fetchSellerProfile = createAsyncThunk("/sellers/fetchSellerProfile", 
    async(jwt : string, {rejectWithValue}) => {
        try {
            const response = await api.get("sellers/profile",{
                headers: {
                    Authorization:`Bearer ${jwt}`
                }
            })
            // console.log("fetch seller profile ",response.data)
            return response.data
        } catch (error:any) {
            console.log("seller profile error - - - " , error)
            return rejectWithValue(error.response?.data || "Failed to fetch profile");
        }
    }
)

export const updateSellerProfile = createAsyncThunk<Seller,{seller: Partial<Seller>,jwt:string}>("/sellers/updateSellerProfile", 
    async({seller, jwt}, {rejectWithValue}) => {
        try {
            const response = await api.patch("sellers/profile",seller,{
                headers: {
                    Authorization:`Bearer ${jwt}`
                }
            })
            // console.log("update seller profile ",response.data)
            return response.data
        } catch (error:any) {
            console.log("update seller profile error - - - " , error)
            return rejectWithValue(error.response?.data || "Failed to update seller profile");
        }
    }
)

export const updateSellerStatus = createAsyncThunk<Seller,{sellerId:number,status:any,jwt:string}>("/sellers/updateSellerStatus", 
    async({sellerId,status, jwt}, {rejectWithValue}) => {
        try {
            const response = await api.patch(`/api/seller/${sellerId}/status/${status}`,null,{
                headers: {
                    Authorization:`Bearer ${jwt}`
                }
            })
            // console.log("update seller status ",response.data)
            return response.data
        } catch (error:any) {
            console.log("update seller status error - - - " , error)
            return rejectWithValue(error.response?.data || "Failed to update seller status");
        }
    }
)

export const sellerLogin = createAsyncThunk<any,any>("/sellers/sellerLogin", 
    async(loginRequest:{email : string}, {rejectWithValue}) => {
        try {
            const response = await api.post("/sellers/login",loginRequest)
            const jwt = response.data.jwt;
            localStorage.setItem("jwt",jwt)
            // console.log("seller login  -- ",response.data)
            return jwt
        } catch (error:any) {
            console.log("seller login error - - - " , error)
            return rejectWithValue(error.response?.data || "Login failed");
        }
    }
)

export const createSeller = createAsyncThunk<Seller,{seller:Partial<Seller>}>("/sellers/createSeller",
    async ({seller}, {rejectWithValue}) => {
        try {
            const response = await api.post("/sellers",seller)
            // console.log("create seller - - ",response.data)
            return response.data
        } catch (error:any) {
            console.log("create seller error - -",error.response,"seller - - -",seller)
            return rejectWithValue(error)
        }
    }
)

export const VerifySeller = createAsyncThunk<Seller,{otp:string}>("/sellers/VerifySeller", 
    async({otp}, {rejectWithValue}) => {
        try {
            const response = await api.post(`/sellers/verify/${otp}`)
            // console.log("seller verifired  -- ",response.data)
            return response.data
        } catch (error:any) {
            console.log("seller verify error - - - " , error)
            return rejectWithValue(error.response?.data || "verify failed");
        }
    }
)

export const sellerLogout = createAsyncThunk<any,any>(
    "/sellers/sellerLogout",
    async (navigate, { rejectWithValue }) => {
      try {
        localStorage.clear(); 
        console.log("Logout success");
        navigate("/");
      } catch (error:any) {
        console.log("Logout error: ", error);
        return rejectWithValue(error.response?.data || "Logout failed");
      }
    }
  );

interface SellerState{
    sellers:Seller[],
    selectedSeller:Seller | null,
    profile:Seller | null,
    jwt:string | null
    report:any,
    loading:boolean,
    error:any,
    isLoggedIn:boolean
    sellerUpdated: boolean,
}

const initialState:SellerState={
    sellers:[],
    selectedSeller:null,
    profile:null,
    report:null,
    loading:false,
    jwt:null,
    error:null,
    isLoggedIn:false,
    sellerUpdated: false
}

const sellerSlice = createSlice({
    name:"sellers",
    initialState,
    reducers:{},
    extraReducers:(builder)=> {
        builder.addCase(fetchSellerProfile.pending,(state) =>{
            state.loading=true
            state.error=null
            state.isLoggedIn=false
        })
        builder.addCase(fetchSellerProfile.fulfilled,(state,action)=>{
            state.loading=false
            state.profile=action.payload
            if(action.payload){
                state.isLoggedIn=true
            }
        })
        builder.addCase(fetchSellerProfile.rejected,(state,action)=>{
            state.loading=false
            state.error = action.payload
            state.isLoggedIn=false
        })
        .addCase(getAllSellers.fulfilled,(state,action)=>{
            state.sellers=action.payload
        })
        builder.addCase(sellerLogin.pending,(state) =>{
            state.loading=true
            state.error=null
            state.isLoggedIn=false
        })
        builder.addCase(sellerLogin.fulfilled,(state,action)=>{
            state.jwt=action.payload
            if(action.payload){
                state.isLoggedIn=true
            }
            state.loading=false
        })
        builder.addCase(sellerLogin.rejected,(state,action)=>{
            state.loading=false
            state.error = action.payload
            state.isLoggedIn=false
        })
        .addCase(updateSellerProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.sellerUpdated = false
          })
          .addCase(updateSellerProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.profile = action.payload
            if(action.payload){
                state.sellerUpdated = true
            }
          })
          .addCase(updateSellerProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.sellerUpdated = false
          })
          .addCase(createSeller.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.isLoggedIn = false
          })
          .addCase(createSeller.fulfilled, (state, action) => {
            state.loading = false;
            state.selectedSeller = action.payload
          })
          .addCase(createSeller.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isLoggedIn = false
          })
          .addCase(VerifySeller.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.isLoggedIn = false
          })
          .addCase(VerifySeller.fulfilled, (state, action) => {
            state.loading = false;
            state.selectedSeller = action.payload
          })
          .addCase(VerifySeller.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isLoggedIn = false
          })
          .addCase(updateSellerStatus.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.sellerUpdated = false
          })
          .addCase(updateSellerStatus.fulfilled, (state, action) => {
            state.loading = false;
            const index = state.sellers.findIndex(sel => sel.id === action.payload.id)
            if(index != -1){
                state.sellers[index] = action.payload
                state.sellerUpdated = true
            }
          })
          .addCase(updateSellerStatus.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.sellerUpdated = false
          })
        builder.addCase(sellerLogout.fulfilled,(state) =>{
            state.isLoggedIn = false,
            state.jwt = null
            state.profile = null
        })
    },
})

export default sellerSlice.reducer
