/* eslint-disable import/no-extraneous-dependencies */
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import activeBookReducer from './slices/active-book-slice';
import authReducer from './slices/auth-slice';
import booksReducer from './slices/books-slice';
import categoriesReducer from './slices/category-slice';
import forgotReducer from './slices/forgot-slice';
import registerReducer from './slices/register-slice';
import viewReducer from './slices/view-slice';

export const store = configureStore({
  reducer: {
    view: viewReducer,
    categories: categoriesReducer,
    books: booksReducer,
    activeBook: activeBookReducer,
    auth: authReducer,
    register: registerReducer,
    forgot: forgotReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
