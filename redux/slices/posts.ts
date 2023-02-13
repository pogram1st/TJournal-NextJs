import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import type { RootState } from '../store';
import { PostProps } from '../../utils/api/types';
import { HYDRATE } from 'next-redux-wrapper';

export interface PostsState {
  data: PostProps[] | any[];
}

const initialState: PostsState = {
  data: [],
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<PostProps[]>) => {
      state.data = action.payload;
    },
    deletePost: (state, action: PayloadAction<PostProps[]>) => {
      return { data: [] };
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return { data: action.payload.posts.data };
    },
  },
});

export const { setPosts } = postsSlice.actions;

export const selectPosts = (state: RootState) => state.posts.data;

export const postsReducer = postsSlice.reducer;
