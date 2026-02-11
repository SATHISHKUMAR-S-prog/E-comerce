import { noCmyk } from "@cloudinary/url-gen/qualifiers/colorSpace";
import { LocalDining } from "@mui/icons-material";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { boolean, string } from "yup";
import { api } from "../../Config/Api";
import { Transaction } from "../../Types/TransactionTypa";

interface TransactionState{
    transactions:Transaction[];
    transaction:Transaction | null;
    loading:boolean;
    error:string | null;
}

const initialState: TransactionState = {
    transactions:[],
    transaction: null,
    loading:false,
    error:null,   
}

export const fetchtransactionBySellerId = createAsyncThunk<Transaction[],string>("/transactions/fetchTransactionBySellerId",
    async (jwt,{rejectWithValue}) => {
        try {
            const response = await api.get("/api/transactions/seller",{
                headers:{
                    Authorization: `Bearer ${jwt}`
                }
            })
            // console.log("seller transaction - -", response.data)
            return response.data
        } catch (error:any) {
            console.log('seller transaction error -- ',error)
            return rejectWithValue(error.response.data || "Failed to fetch the seller transactions")
        }
    }
)

export const fetchAllTransactions = createAsyncThunk<Transaction[],void>("/transactions/fetchAllTransactions",
    async (_,{rejectWithValue}) => {
        try {
            const response = await api.get("/api/transactions"
            )
            // console.log("all transactions - -", response.data)
            return response.data
        } catch (error:any) {
            console.log('seller transaction error -- ',error)
            return rejectWithValue(error.response.data || "Failed to fetch all transactions")
        }
    }
)

const transactionSlice = createSlice({
    name:"transactions",
    initialState,
    reducers:{},
    extraReducers:(builder)=> {
        builder.addCase(fetchtransactionBySellerId.pending,(state) =>{
            state.loading=true
            state.error=null
        })
        builder.addCase(fetchtransactionBySellerId.fulfilled,(state,action)=>{
            state.loading=false
            state.transactions=action.payload
        })
        builder.addCase(fetchtransactionBySellerId.rejected,(state,action)=>{
            state.loading=false
            state.error = action.payload as string
        })
        .addCase(fetchAllTransactions.pending,(state) =>{
            state.loading=true
            state.error=null
        })
        .addCase(fetchAllTransactions.fulfilled,(state,action)=>{
            state.loading=false
            state.transactions=action.payload
        })
        .addCase(fetchAllTransactions.rejected,(state,action)=>{
            state.loading=false
            state.error = action.payload as string
        })
    },
})

export default transactionSlice.reducer