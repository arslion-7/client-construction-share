import { apiSlice } from '../../app/api/apiSlice';
import { IUserResponse } from '../users/types';
import { IRequestResetPassword, IRequestUser, IResponseUser } from './types';

const URL = '/auth';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<IResponseUser, IRequestUser>({
      query: (credentials) => ({
        url: `${URL}/sign-in`,
        method: 'POST',
        body: { ...credentials }
      })
    }),
    resetPassword: builder.mutation<string, IRequestResetPassword>({
      query: ({ id, password }) => ({
        url: `${URL}/reset-password/${id}`,
        method: 'PUT',
        body: { password }
      })
    }),
    getMe: builder.query<IUserResponse, null>({
      query: () => `${URL}/me`
      // providesTags: []
    })
  })
});

export const { useSignInMutation, useResetPasswordMutation, useGetMeQuery } =
  authApiSlice;
