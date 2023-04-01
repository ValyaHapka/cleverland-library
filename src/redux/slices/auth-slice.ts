/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-default-export */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { AxiosAuth } from '../../axios/axios';
import { Status } from '../../interfaces/books-state';
import { IAuth, UserData, UserInfo } from '../../interfaces/i-auth';
import { RootState } from '../store';

export const fetchUserData = createAsyncThunk('auth/fetchUserData', async (params: UserInfo, { rejectWithValue }) => {
  try {
    const { data } = await AxiosAuth.post('/api/auth/local', params);

    return data;
  } catch (err) {
    return rejectWithValue(err as AxiosError);
  }
});

const initialState: IAuth = {
  data: null,
  status: Status.EMPTY,
  error: null,
  requestData: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeStatus: (state) => {
      state.status = Status.EMPTY;
    },
    clearError: (state) => {
      state.error = null;
    },
    setRequestData: (state, action) => {
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

export const { changeStatus, clearError, setRequestData } = authSlice.actions;

export const authSelector = (state: RootState) => state.auth;

export default authSlice.reducer;
