import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { userReducer } from './slices/user';
import { postsReducer } from './slices/posts';

export function makeStore() {
  return configureStore({
    reducer: {
      user: userReducer,
      posts: postsReducer,
    },
  });
}

export const store = makeStore();

export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore['getState']>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const wrapper = createWrapper<RootStore>(makeStore);
