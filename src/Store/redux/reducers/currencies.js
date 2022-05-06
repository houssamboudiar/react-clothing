import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
//USD GBP AUD JPY RUB
const initialState = {
  currencies: [],
  currentCurrency: {label:'USD',symbol:'$'},
  loading: 'idle' | 'pending' | 'succeeded' | 'failed',
  error: '',
}

const getCurrenciesQuery = `
{
	currencies{
    label,
    symbol,
    }
}
`

export const fetchCurrencies = createAsyncThunk('currencies/fetchCurrencies', async () => {
  const response = fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(
          {query: getCurrenciesQuery}
      )})
  .then(function (response) {
      return response.json()})
  .then(function (json) {
      return json.data.currencies})
  .catch(function (error) {
      console.log('error', error)})
  return response
})

export const setCurrent = () => {

}

// Then, handle actions in your reducers:
const currenciesSlice = createSlice({
  name: 'currencies',
  initialState,
  reducers: {
    setCurrency(state, currency) {
      state.currentCurrency = currency.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrencies.pending, (state, action) => {
        state.loading = 'pending'
        state.currencies = []
      })
      .addCase(fetchCurrencies.fulfilled, (state, action) => {
          state.loading = 'succeeded'
          state.currencies = action.payload
      })
  }
});

export const { setCurrency } = currenciesSlice.actions

export default currenciesSlice.reducer;