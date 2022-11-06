import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filteredEntries: []
}

const filterSlice = createSlice ({
    name: "filter",
    initialState,
    reducers: {
        FILTER_ENTRIES(state, action) {
            const {entries, search} = action.payload
            const tempEntries = entries?.filter((entry) => 
                entry?.title?.toLowerCase().includes(search?.toLowerCase()) || entry?.author?.toLowerCase().includes(search?.toLowerCase())
            )
            state.filteredEntries = tempEntries
        }
    }
})

export const {FILTER_ENTRIES} = filterSlice.actions

export const selectFiltered = (state) => state.filter.filteredEntries;

export default filterSlice.reducer