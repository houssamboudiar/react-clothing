import { createSlice } from '@reduxjs/toolkit'
//USD GBP AUD JPY RUB
const initialState = {
  product: {},
}

// Then, handle actions in your reducers:
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProduct(state, action) {
      state.product = action.payload;
    },
  },
});

export const { setProduct } = productSlice.actions

export default productSlice.reducer