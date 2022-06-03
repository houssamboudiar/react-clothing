import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [],
    counter: 0,
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProductCart(state, action) {
            console.log(state)
            console.log(action)
            if (state.products.find((p) => p.id === action.payload.product.id && JSON.stringify(p.attributes) === JSON.stringify(action.payload.product.attributes))) {
                state.products.find((p) => p.id === action.payload.product.id && JSON.stringify(p.attributes) === JSON.stringify(action.payload.product.attributes)).qte++
            } else {
                const clone = JSON.parse(JSON.stringify(action.payload));
                clone.product.qte = 1;
                state.products.push({...clone.product});
            }
            state.counter++;
        },
        increaseProductQte(state, action) {
            state.products.find((p) => p.id === action.payload.id && JSON.stringify(p.attributes) === JSON.stringify(action.payload.attributes)).qte++
            state.counter++;
        },
        decreaseProductQte(state, action) {
            if (state.products.find((p) => p.id === action.payload.id && JSON.stringify(p.attributes) === JSON.stringify(action.payload.attributes)).qte > 1) {
                state.products.find((p) => p.id === action.payload.id && JSON.stringify(p.attributes) === JSON.stringify(action.payload.attributes)).qte--;
                state.counter--;
            };
        },
    },
})

export const { addProductCart, increaseProductQte, decreaseProductQte } = cartSlice.actions

export default cartSlice.reducer;