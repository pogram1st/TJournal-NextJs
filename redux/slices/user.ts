import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState, AppThunk } from '../store';
import { ResponseCreateUser } from '../../utils/api/types';
import { HYDRATE } from 'next-redux-wrapper';

export interface UserState {
  data: ResponseCreateUser | null;
}

const initialState: UserState = {
  data: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<ResponseCreateUser>) => {
      return { data: action.payload };
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return { data: action.payload.user.data };
    },
  },
});

export const { setUserData } = userSlice.actions;

export const selectUserData = (state: RootState) => state.user.data;

export const userReducer = userSlice.reducer;
