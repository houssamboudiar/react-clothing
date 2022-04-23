import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './redux/reducers/categories'
import productsReducer from './redux/reducers/products'

export const store = configureStore({
  reducer:{
    categories: categoriesReducer,
    products: productsReducer,
  },
});