import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

// Define a type for the slice state
interface AuthState {
  user: null | string;
  token: null | string;
}

// Define the initial state using that type
const initialState: AuthState = {
  user: null,
  token: null,
};

interface IUser {
  user: string;
  accessToken: string;
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<IUser>) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;
