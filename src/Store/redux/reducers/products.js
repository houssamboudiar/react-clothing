import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  loading: 'idle' | 'pending' | 'succeeded' | 'failed',
  error: '',
}

export const listProducts = createAsyncThunk('products/listedProducts', async (products) => {
  const productList = products;
  return productList
});

// Then, handle actions in your reducers:
const productsSlice = createSlice({
  name: 'products/listedProducts',
  initialState,
  reducers: {
    setProducts(state, action) {
        state.products = action.payload
    },
  },
});

export const { setProducts } = productsSlice.actions
export default productsSlice.reducer