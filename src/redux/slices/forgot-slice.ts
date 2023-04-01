/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-default-export */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { AxiosAuth } from '../../axios/axios';
import { Status } from '../../interfaces/books-state';
import { ForgotInput, ForgotState, ResetPassword } from '../../interfaces/forgot-pass-int';
import { UserData } from '../../interfaces/i-auth';
import { RootState } from '../store';

export const fetchForgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (params: ForgotInput, { rejectWithValue }) => {
    try {
      const { data } = await AxiosAuth.post('/api/auth/forgot-password', params);

      return data;
    } catch (err) {
      return rejectWithValue(err as AxiosError);
    }
  }
);

export const fetchResetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (params: ResetPassword, { rejectWithValue }) => {
    try {
      const { data } = await AxiosAuth.post('/api/auth/reset-password', params);

      return data;
    } catch (err) {
      return rejectWithValue(err as AxiosError);
    }
  }
);

const initialState: ForgotState = {
  data: null,
  statusSend: Status.EMPTY,
  statusReset: Status.EMPTY,
  error: null,
  errorSend: null,
  requestData: null,
};

export const forgotSlice = createSlice({
  name: 'forgot',
  initialState,
  reducers: {
    changeStatusSend: (state) => {
      state.statusSend = Status.EMPTY;
    },
    changeStatusReset: (state) => {
      state.statusReset = Status.EMPTY;
    },
    clearError: (state) => {
      state.error = null;
    },
    setRequestData: (state, action) => {
      state.requestData = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchForgotPassword.pending, (state) => {
      state.statusSend = Status.LOADING;
    });
    builder.addCase(fetchForgotPassword.fulfilled, (state) => {
      state.statusSend = Status.LOADED;
    });
    builder.addCase(fetchForgotPassword.rejected, (state, action) => {
      state.statusSend = Status.ERROR;
      state.errorSend = (action.payload as AxiosError).response?.statusText;
    });
    builder.addCase(fetchResetPassword.pending, (state) => {
      state.statusReset = Status.LOADING;
      state.data = null;
    });
    builder.addCase(fetchResetPassword.fulfilled, (state, action: PayloadAction<UserData>) => {
      state.data = action.payload;
      state.statusReset = Status.LOADED;
    });
    builder.addCase(fetchResetPassword.rejected, (state, action) => {
      state.statusReset = Status.ERROR;
      state.data = null;
      state.error = (action.payload as AxiosError).response?.status;
    });
  },
});

export const { changeStatusSend, changeStatusReset, clearError, setRequestData } = forgotSlice.actions;

export const forgotSelector = (state: RootState) => state.forgot;

export default forgotSlice.reducer;
