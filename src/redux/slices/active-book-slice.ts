/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-default-export */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AxiosBooks } from '../../axios/axios';
import { ActiveBookState } from '../../interfaces/active-book-state';
import { FetchedBook } from '../../interfaces/books-fetch';
import { Status } from '../../interfaces/books-state';
import { RootState } from '../store';

export const fetchBookById = createAsyncThunk('books/fetchBookByIdStatus', async (id: string) => {
  const query = await AxiosBooks.get<FetchedBook>(`/api/books/${id}`);

  return query.data;
});

const initialState: ActiveBookState = {
  status: Status.EMPTY,
  book: {},
};

export const activeBookSlice = createSlice({
  name: 'activeBook',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchBookById.pending, (state) => {
      state.status = Status.LOADING;
      state.book = {};
    });
    builder.addCase(fetchBookById.fulfilled, (state, action: PayloadAction<FetchedBook>) => {
      state.book = action.payload;
      state.status = Status.LOADED;
    });
    builder.addCase(fetchBookById.rejected, (state) => {
      state.status = Status.ERROR;
      state.book = {};
    });
  },
});

export const activeBookSelector = (state: RootState) => state.activeBook;

export default activeBookSlice.reducer;
