import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface WishlistState {
    wishlistItems: any[];
}

const initialState: WishlistState = {
    wishlistItems: [],
};

const WishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        toggleWishlist: (state, action: PayloadAction<any>) => {
            const existingIndex = state.wishlistItems.findIndex(item => item._id === action.payload._id);
            if (existingIndex >= 0) {
                state.wishlistItems.splice(existingIndex, 1);
            } else {
                state.wishlistItems.push(action.payload);
            }
        }
    },
});

export const { toggleWishlist } = WishlistSlice.actions;
export default WishlistSlice.reducer;
