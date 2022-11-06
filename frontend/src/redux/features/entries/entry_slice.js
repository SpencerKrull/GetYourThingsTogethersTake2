import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import entryService from "../../../services/entryService";

const initialState = {
    entry: null,
    entries: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

// create entry
export const createEntry = createAsyncThunk(
    "entries/create",
    async (formData, thunkAPI) => {
        try {
            return await entryService.makeEntry(formData)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
                console.log(message)
                return thunkAPI.rejectWithValue(message)
        }
    }
)

//find all entries
export const getEntries = createAsyncThunk(
    "entries/findAll",
    async (_, thunkAPI) => {
        try {
            return await entryService.getEntries()
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
                console.log(message)
                return thunkAPI.rejectWithValue(message)
        }
    }
)

const entrySlice = createSlice({
    name: "entry",
    initialState,
    reducers: {
        CALC_ENTRY_QUANTITY: (state, action) => {
            console.log("total entries")
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createEntry.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createEntry.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                console.log(action.payload)
                state.entries.push(action.payload)
                toast.success("You got this thing together!")
            })
            .addCase(createEntry.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                console.log(action.payload)
                state.entries.push(action.payload)
                toast.error("You did not this thing together :/")
            })
            .addCase(getEntries.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getEntries.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                console.log(action.payload)
                state.entries.push(action.payload)
                state.entries = action.payload;
            })
            .addCase(getEntries.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload)
            })
    }
})

export const {CALC_ENTRY_QUANTITY} = entrySlice.actions;

export const selectIsLoading = (state) => state.entry.isLoading

export default entrySlice.reducer;