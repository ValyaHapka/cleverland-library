/* eslint-disable no-param-reassign */
/* eslint-disable import/no-default-export */
/* eslint-disable import/no-extraneous-dependencies */
import { createSlice } from '@reduxjs/toolkit';

import { ViewState } from '../../interfaces/view-state';
import { RootState } from '../store';

const initialState: ViewState = {
  squareView: true,
  isBurger: false,
};

export const viewSlice = createSlice({
  name: 'view',
  initialState,
  reducers: {
    changeView: (state, action) => {
      state.squareView = action.payload;
    },
    changeBurger: (state, action) => {
      state.isBurger = action.payload;
    },
  },
});

export const { changeView, changeBurger } = viewSlice.actions;
export const viewSelector = (state: RootState) => state.view.squareView;
export const burgerSelector = (state: RootState) => state.view.isBurger;

export default viewSlice.reducer;
