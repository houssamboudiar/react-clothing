import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './redux/reducers/categories'
import currenciesReducer from './redux/reducers/currencies'
import productsReducer from './redux/reducers/products'

export const store = configureStore({
  reducer:{
    categories: categoriesReducer,
    products: productsReducer,
    currencies: currenciesReducer,
  },
});