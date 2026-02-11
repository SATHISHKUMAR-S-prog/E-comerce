import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../Config/Api";
import axios from "axios";
import { User, Userrole } from "../Types/UserType";
import { Alert } from "@mui/material";

export const sentLoginSignUpOtp = createAsyncThunk("/auth/sentLoginSignUpOtp", 
    async(loginOtpRequest:{email : string,role:Userrole}, {rejectWithValue}) => {
        try {
            const response = await api.post("/auth/sent/login-signUp-otp",loginOtpRequest)
            return response.data.message
            // console.log("login otp -- ",response)
        } catch (error:any) {
            console.log("sent otp error - - - " , error)
            return rejectWithValue(error.response.data); 
        }
    }
)

export const signin = createAsyncThunk<any,any>("/auth/signin", 
    async(loginRequest:{email : string}, {rejectWithValue}) => {
        try {
            const response = await api.post("/auth/signin",loginRequest)

            // console.log("login ---  ",response)
            const jwt = await response.data.jwt
            localStorage.setItem("jwt",jwt)
            return jwt
        } catch (error:any) {
            console.log("user sign in error - - - " , error)
            return rejectWithValue(error.response.data); 
        }
    }
)

export const signUp = createAsyncThunk<any,any>("/auth/signUp", 
    async(signUpRequest:{email:string,otp:string,fullname:string}, {rejectWithValue}) => {
        try {
            const response = await api.post("/auth/signUp",signUpRequest)

            // console.log("login ---  ",response)
            const jwt = await response.data.jwt
            localStorage.setItem("jwt",jwt)
            return jwt
        } catch (error:any) {
            console.log("user sign up error - - - " , error)
            return rejectWithValue(error); 
        }
    }
)

export const fetchUserProfile = createAsyncThunk<any,any>("/auth/fetchUserProfile", 
    async({jwt}, {rejectWithValue}) => {
        try {
            const response = await api.get("/api/user/profile",{
                headers: {
                    Authorization:`Bearer ${jwt}`
                }
            })

            // console.log("login ---  ",response)
            const data = await response.data
            return data
        } catch (error) {
            console.log("user profile error - - - " , error)
            return rejectWithValue(error); 
        }
    }
)

export const logout = createAsyncThunk<any,any>(
    "/auth/logout",
    async (navigate, { rejectWithValue }) => {
      try {
        localStorage.clear(); 
        // console.log("Logout success", localStorage);
        navigate("/");
      } catch (error) {
        console.log("Logout error: ", error);
        return rejectWithValue(error); 
      }
    }
  );

interface AuthState{
    isLoggedIn: boolean;
    user:User | null;
    jwt:string | null;
    otpSent:boolean;
    loading:boolean;
    error:string | null;
    message:string | null
}

const initialState:AuthState={
    isLoggedIn: false,
    user:null,
    jwt:null,
    otpSent:false,
    loading:false,
    error:null,
    message:null
}

const authSlice =createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder.addCase(sentLoginSignUpOtp.pending,(state)=> {
            state.loading = true
            state.otpSent = false
        })
        builder.addCase(sentLoginSignUpOtp.fulfilled,(state,action)=> {
            state.loading = false
            state.message = action.payload
            state.otpSent = true
        })
        builder.addCase(sentLoginSignUpOtp.rejected,(state,action)=> {
            state.loading = false
            state.otpSent = false
            state.error = action.payload as string
        })
        builder.addCase(signin.pending,(state)=> {
            state.loading = true
            state.error = null
        })
        builder.addCase(signUp.pending,(state)=> {
            state.loading = true
            state.error = null
        })
        builder.addCase(signin.fulfilled,(state,action) => {
            state.jwt = action.payload
            if(action.payload.jwt){
                state.isLoggedIn = true
            }
            state.loading=false
        })
        builder.addCase(signUp.fulfilled,(state,action) => {
            state.jwt = action.payload
            if(action.payload){
                state.isLoggedIn = true
            }
            state.loading=false
        })
        builder.addCase(fetchUserProfile.fulfilled,(state,action) => {
            state.user = action.payload
            if(action.payload){
                state.isLoggedIn = true
            }
            state.loading=false
        })
        builder.addCase(signin.rejected,(state,action) => {
            state.error = action.payload as string
            state.isLoggedIn = false
            state.loading=false
        })
        builder.addCase(signUp.rejected,(state,action) => {
            state.error = action.payload as string
            state.isLoggedIn = false
            state.loading=false
        })
        builder.addCase(fetchUserProfile.rejected,(state,action) => {
            state.error = action.payload as string
            state.isLoggedIn = false
            state.loading = false
        })
        builder.addCase(logout.fulfilled,(state) =>{
            state.isLoggedIn = false,
            state.jwt = null
            state.user = null
            state.otpSent = false
        })
    },
})

export default authSlice.reducer