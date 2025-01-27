import { configureStore } from '@reduxjs/toolkit';
import auth from '../features/auth/authSlice';
import { apiSlice } from './api/apiSlice';
import { rtkQueryErrorLogger } from './api/errorResponseMiddleware';
// import { errorResponseMiddleware } from "./api/errorResponseMiddleware";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth,
  },
  middleware: (getDefaultMiddleware) =>
    //  errorResponseMiddleware
    getDefaultMiddleware().concat(apiSlice.middleware, rtkQueryErrorLogger),

  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
