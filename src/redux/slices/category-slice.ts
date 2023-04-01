/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-default-export */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AxiosBooks } from '../../axios/axios';
import { Status } from '../../interfaces/books-state';
import { Category, CategoryState } from '../../interfaces/category-state';
import { RootState } from '../store';

export const fetchCategories = createAsyncThunk('books/fetchCategoriesStatus', async () => {
  const query = await AxiosBooks.get<Category[]>('/api/categories');

  return query.data;
});

const initialState: CategoryState = {
  statusCategories: Status.EMPTY,
  categories: [],
  activeCategory: {
    name: 'Все книги',
    path: '/books/all',
  },
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    changeCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchCategories.pending, (state) => {
      state.statusCategories = Status.LOADING;
      state.categories = [];
    });
    builder.addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
      state.statusCategories = Status.LOADED;
    });
    builder.addCase(fetchCategories.rejected, (state) => {
      state.statusCategories = Status.ERROR;
      state.categories = [];
    });
  },
});

export const { changeCategory } = categoriesSlice.actions;

export const categoriesSelector = (state: RootState) => state.categories;

export default categoriesSlice.reducer;
