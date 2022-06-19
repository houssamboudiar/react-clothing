import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  categories: [],
  loadedCategory: [],
  loadingCategory: 'idle' | 'pending' | 'succeeded' | 'failed',
  product: {},
  loading: 'idle' | 'pending' | 'succeeded' | 'failed',
  error: '',
}

const getAllProductsQuery = `
{
  categories{
    name
  }
}
`

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const response = fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(
          {query: getAllProductsQuery}
      )})
  .then(function (response) {
      return response.json()})
  .then(function (json) {
      return json.data.categories})
  .catch(function (error) {
      console.log('error', error)})
  return response
})

export const fetchProductsByCategory = createAsyncThunk('categories/fetchProductsByCategory', async (category) => {
  const response = fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(
          {query:  `
                    {
                      category(input:{title:"${category}"}){
                        name
                        products{
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
                    }
          `
        }
      )})
  .then(function (response) {
      return response.json()})
  .then(function (json) {
      return json.data.category})
  .catch(function (error) {
      console.log('error', error)})
  return response
})

// Then, handle actions in your reducers:
const categoriesSlice = createSlice({
  name: 'categories/',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state, action) => {
        state.loading = 'pending'
        state.categories = []
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
          state.loading = 'succeeded'
          state.categories = action.payload
      })
      .addCase(fetchProductsByCategory.pending, (state, action) => {
        state.loadingCategory = 'pending'
        state.loadedCategory = []
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loadingCategory = 'succeeded'
        state.loadedCategory = action.payload
      })
  }
});

export default categoriesSlice.reducer;