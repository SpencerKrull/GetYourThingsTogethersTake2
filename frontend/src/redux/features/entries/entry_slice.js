import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import entryService from "../../../services/entryService";

const initialState = {
  entry: null,
  entriess: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  totalStoreValue: 0,
  outOfStock: 0,
  category: [],
};

// Create New Entry
export const createEntry = createAsyncThunk(
  "entry/create",
  async (formData, thunkAPI) => {
    try {
      return await entryService.makeEntry(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all entries
export const getEntries = createAsyncThunk(
  "entries/getAll",
  async (_, thunkAPI) => {
    try {
      return await entryService.getEntries();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete an entry
export const deleteEntry = createAsyncThunk(
  "entries/delete",
  async (id, thunkAPI) => {
    try {
      return await entryService.deleteEntry(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get a entry
export const getEntry = createAsyncThunk(
  "entries/getEntry",
  async (id, thunkAPI) => {
    try {
      return await entryService.getEntry(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Update entry
export const updateEntry = createAsyncThunk(
  "entriess/updateEntry",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await entryService.updateEntry(id, formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const entrySlice = createSlice({
  name: "entry",
  initialState,
  reducers: {
    CALC_STORE_VALUE(state, action) {
      const entries = action.payload;
      const array = [];
      entries.map((item) => {
        const { price, quantity } = item;
        const entryValue = price * quantity;
        return array.push(entryValue);
      });
      const totalValue = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.totalStoreValue = totalValue;
    },
    CALC_OUTOFSTOCK(state, action) {
      const entries = action.payload;
      const array = [];
      entries.map((item) => {
        const { quantity } = item;

        return array.push(quantity);
      });
      let count = 0;
      array.forEach((number) => {
        if (number === 0 || number === "0") {
          count += 1;
        }
      });
      state.outOfStock = count;
    },
    CALC_CATEGORY(state, action) {
      const entries = action.payload;
      const array = [];
      entries.map((item) => {
        const { category } = item;

        return array.push(category);
      });
      const uniqueCategory = [...new Set(array)];
      state.category = uniqueCategory;
    },
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
        console.log(action.payload);
        state.entries.push(action.payload);
        toast.success("Item added successfully");
      })
      .addCase(createEntry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getEntries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEntries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.entries = action.payload;
      })
      .addCase(getEntries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(deleteEntry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEntry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Item deleted successfully");
      })
      .addCase(deleteEntry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getEntry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEntry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.entry = action.payload;
      })
      .addCase(getEntry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateEntry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateEntry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Item updated successfully");
      })
      .addCase(updateEntry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { CALC_STORE_VALUE, CALC_OUTOFSTOCK, CALC_CATEGORY } =
  entrySlice.actions;

export const selectIsLoading = (state) => state.entry.isLoading;
export const selectEntry = (state) => state.entry.entry;
export const selectTotalStoreValue = (state) => state.entry.totalStoreValue;
export const selectOutOfStock = (state) => state.entry.outOfStock;
export const selectCategory = (state) => state.entry.category;

export default entrySlice.reducer;