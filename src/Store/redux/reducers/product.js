import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
//USD GBP AUD JPY RUB
const initialState = {
  product: {},
  loading: 'idle' | 'pending' | 'succeeded' | 'failed',
}

export const fetchProductById = createAsyncThunk('fetchProductsById', async (id) => {
  const response = fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(
          {query:  `
          {
            product(id:"${id}"){
                id
                name
                inStock
                gallery
                description
                category
                attributes{
                  id
                  name
                  type
                  items{
                    displayValue
                    id
                    value
                  }
                }
                prices{
                  currency{
                    label
                  }
                  amount
                }
                brand
              }
          }
          `
        }
      )})
  .then(function (response) {
      return response.json()})
  .then(function (json) {
      const clone = JSON.parse(JSON.stringify(json.data.product));
      clone.attributes.map((e) => (e.items.map((l, index) => {
        return (index===0) ? l.selected = true : l.selected = false;
      })));
      return clone
    })
  .catch(function (error) {
      console.log('error', error)})
  return response
})

// Then, handle actions in your reducers:
const productSlice = createSlice({
  name: 'product/',
  initialState,
  reducers: {
    setProduct(state, action) {
      state.product = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state, action) => {
        state.loading = 'pending'
        state.product = []
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
          state.loading = 'succeeded'
          state.product = action.payload
      })
  }
});

export const { setProduct } = productSlice.actions

export default productSlice.reducer