/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-default-export */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { AxiosAuth } from '../../axios/axios';
import { Status } from '../../interfaces/books-state';
import { UserData } from '../../interfaces/i-auth';
import { RegisterState, RegisterUserInfo, requestDataPattern, Step } from '../../interfaces/register-user';
import { RootState } from '../store';

export const fetchUserData = createAsyncThunk(
  'auth/fetchRegister',
  async (params: RegisterUserInfo, { rejectWithValue }) => {
    try {
      const { data } = await AxiosAuth.post('/api/auth/local/register', params);

      return data;
    } catch (err) {
      return rejectWithValue(err as AxiosError);
    }
  }
);

const initialState: RegisterState = {
  data: null,
  status: Status.EMPTY,
  error: null,
  step: Step.FIRST,
  requestData: requestDataPattern,
};

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    changeStatus: (state) => {
      state.status = Status.EMPTY;
    },
    changeStep: (state, action) => {
      state.step = action.payload;
    },
    changeRequestData: (state, action) => {
      state.requestData = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchUserData.pending, (state) => {
      state.status = Status.LOADING;
      state.data = null;
    });
    builder.addCase(fetchUserData.fulfilled, (state, action: PayloadAction<UserData>) => {
      state.data = action.payload;
      state.status = Status.LOADED;
    });
    builder.addCase(fetchUserData.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.data = null;
      state.error = (action.payload as AxiosError).response?.status;
    });
  },
});

export const { changeStatus, changeStep, changeRequestData } = registerSlice.actions;

export const registerSelector = (state: RootState) => state.register;

export default registerSlice.reducer;
