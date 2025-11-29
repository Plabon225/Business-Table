import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: "product",
    initialState: {
        total: 0,
        allProducts: [],
    },
    reducers: {
        setTotal: (state, action) => {
            state.total = action.payload;
        },
        setAllProducts: (state, action) => {
            state.allProducts = action.payload;
        },
    },
});

export const { setTotal, setAllProducts } = productSlice.actions;
export default productSlice.reducer;
