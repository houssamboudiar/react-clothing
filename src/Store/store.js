import { configureStore } from '@reduxjs/toolkit';
import categoriesSlice from './redux/reducers/categories'

export const store = configureStore({
  reducer:{
    categories: categoriesSlice,
  },
});