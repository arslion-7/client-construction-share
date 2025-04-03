import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { logOut } from '../../features/auth/authSlice';
import { RootState } from '../store';

const baseQuery = fetchBaseQuery({
  baseUrl: '/api',
  credentials: 'include',
  // mode: 'no-cors',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
      headers.set('Content-Type', 'application/json');
      headers.set('Access-Control-Allow-Origin', '*');
    }
    // headers.set('Access-Control-Allow-Credentials', 'true')

    return headers;
  },
});

const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extranOptions) => {
  let result = await baseQuery(args, api, extranOptions);

  if (result.error && result.error.status === 401) {
    window.location.href = '/sign-in'; // Redirect to sign-in page
  }

  if (result?.error?.status === 403) {
    console.log('sending refresh token');
    // send refresh token to get new access token
    const refreshResult = await baseQuery('/refresh', api, extranOptions);
    if (refreshResult?.data) {
      const user = (api.getState() as RootState).auth.user;
      // store the new token
      if (user) {
        // api.dispatch(setCredentials({ ...refreshResult.data, user }))
      }
      // retry the original query with new access token
      result = await baseQuery(args, api, extranOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  tagTypes: [],
  endpoints: () => ({}),
});
