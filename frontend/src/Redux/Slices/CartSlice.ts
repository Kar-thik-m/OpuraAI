import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
    product: any;
    quantity: number;
}

interface CartState {
    cartItems: CartItem[];
}

const initialState: CartState = {
    cartItems: [],
};

const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<any>) => {
            const existingItem = state.cartItems.find(item => item.product._id === action.payload._id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cartItems.push({ product: action.payload, quantity: 1 });
            }
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.cartItems = state.cartItems.filter(item => item.product._id !== action.payload);
        },
        updateQuantity: (state, action: PayloadAction<{ id: string, quantity: number }>) => {
            const item = state.cartItems.find(item => item.product._id === action.payload.id);
            if (item && action.payload.quantity > 0) {
                item.quantity = action.payload.quantity;
            }
        },
        clearCart: (state) => {
            state.cartItems = [];
        }
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = CartSlice.actions;
export default CartSlice.reducer;
