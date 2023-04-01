/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-default-export */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AxiosBooks } from '../../axios/axios';
import { IBooks } from '../../interfaces/books-fetch';
import { BooksState, Status } from '../../interfaces/books-state';
import { RootState } from '../store';

export const fetchBooks = createAsyncThunk('books/fetchBooksStatus', async () => {
  const query = await AxiosBooks.get<IBooks[]>('/api/books');

  return query.data;
});

const initialState: BooksState = {
  status: Status.EMPTY,
  baseItems: [],
  items: [],
  searchValue: '',
  sortTypeDesc: true,
};

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    sortBooks: (state, action) => {
      state.sortTypeDesc = action.payload;

      function sortItems() {
        if (action.payload) {
          return state.items.sort((a, b) => (b.rating as number) - (a.rating as number));
        }

        return state.items.sort((a, b) => (a.rating as number) - (b.rating as number));
      }

      state.items = sortItems();
    },

    filterBooks: (state, action: PayloadAction<string>) => {
      function filterByCategory() {
        return state.baseItems.filter((book) =>
          book.categories?.some((category: string) => category === action.payload)
        );
      }

      function filterBySearch(books: IBooks[]) {
        return books.filter((book) => book.title.toLowerCase().includes(state.searchValue.toLowerCase()));
      }

      if (action.payload === 'Все книги') {
        state.items = filterBySearch(state.baseItems);
      }

      if (state.searchValue && action.payload !== 'Все книги') {
        state.items = filterBySearch(filterByCategory());
      } else if (!state.searchValue && action.payload !== 'Все книги') {
        state.items = filterByCategory();
      }
    },

    setReduxSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchBooks.pending, (state) => {
      state.status = Status.LOADING;
      state.baseItems = [];
      state.items = [];
    });
    builder.addCase(fetchBooks.fulfilled, (state, action: PayloadAction<IBooks[]>) => {
      state.baseItems = action.payload;
      state.items = action.payload;
      state.status = Status.LOADED;
    });
    builder.addCase(fetchBooks.rejected, (state) => {
      state.status = Status.ERROR;
      state.baseItems = [];
      state.items = [];
    });
  },
});

export const { filterBooks, setReduxSearchValue, sortBooks } = booksSlice.actions;

export const booksSelector = (state: RootState) => state.books;

export default booksSlice.reducer;
