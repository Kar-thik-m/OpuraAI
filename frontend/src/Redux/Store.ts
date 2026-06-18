import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./Slices/ProductsSlice";
import compareReducer from "./Slices/CompareSlice";

export const store = configureStore({
    reducer: {
        products: productReducer,
        compare: compareReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;