import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CompareState {
    loading: boolean;
    error: string | null;
    selectedProducts: any[];
    comparisonResult: any | null;
}

const initialState: CompareState = {
    loading: false,
    error: null,
    selectedProducts: [],
    comparisonResult: null,
};

const CompareSlice = createSlice({
    name: "compare",
    initialState,
    reducers: {
        addToCompare: (state, action: PayloadAction<any>) => {

            if (state.selectedProducts.length < 3 && !state.selectedProducts.find(p => p._id === action.payload._id)) {
                state.selectedProducts.push(action.payload);
            }
        },
        removeFromCompare: (state, action: PayloadAction<string>) => {
            state.selectedProducts = state.selectedProducts.filter(p => p._id !== action.payload);
        },
        compareStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        compareSuccess: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.comparisonResult = action.payload;
        },
        compareFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    addToCompare,
    removeFromCompare,
    compareStart,
    compareSuccess,
    compareFailure,
} = CompareSlice.actions;

export default CompareSlice.reducer;
