import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


interface ProductState {
    loading: boolean;
    error: string | null;
    products: any[];
}

const initialState: ProductState = {
    loading: false,
    error: null,
    products: [],
};

const ProductSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        searchStart: (state) => {
            state.loading = true;
            state.error = null;
        },

        searchSuccess: (state, action: PayloadAction<any[]>) => {
            state.loading = false;
            state.products = action.payload;
        },

        searchFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    searchStart,
    searchSuccess,
    searchFailure,
} = ProductSlice.actions;

export default ProductSlice.reducer;