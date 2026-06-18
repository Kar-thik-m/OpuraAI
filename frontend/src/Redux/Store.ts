import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./Slices/ProductsSlice";
import compareReducer from "./Slices/CompareSlice";
import cartReducer from "./Slices/CartSlice";
import wishlistReducer from "./Slices/WishlistSlice";

export const store = configureStore({
    reducer: {
        products: productReducer,
        compare: compareReducer,
        cart: cartReducer,
        wishlist: wishlistReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;