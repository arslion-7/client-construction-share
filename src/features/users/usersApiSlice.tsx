import {
  IUserResponse,
  IUserCreate,
  IUserUpdateRequest,
} from '@/features/users/types';
import { apiSlice } from '@/app/api/apiSlice';
// import { IRole } from '../roles/types';

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ['USERS', 'USER'],
});

export const usersApiSlice = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<IUserResponse[], string>({
      query: (show) => `/users?show=${show}`,
      providesTags: ['USERS'],
      // keepUnusedDataFor: 5,
    }),
    getUser: builder.query<IUserResponse, string>({
      query: (id) => `/users/${id}`,
      providesTags: ['USER'],
    }),
    updateUser: builder.mutation<
      string,
      { id: number; user: IUserUpdateRequest }
    >({
      query: ({ id, user }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: user,
      }),
      invalidatesTags: ['USERS', 'USER'],
    }),
    deleteUser: builder.mutation<string, string>({
      query: (id) => ({
        method: 'DELETE',
        url: `/users/${id}`,
      }),
      invalidatesTags: ['USERS'],
    }),
    restoreUser: builder.mutation<string, string>({
      query: (id) => ({
        method: 'PUT',
        url: `/users/${id}/restore`,
      }),
      invalidatesTags: ['USERS'],
    }),
    createUser: builder.mutation<IUserResponse, IUserCreate>({
      query: (body) => ({
        method: 'POST',
        url: '/users',
        body,
      }),
      invalidatesTags: ['USERS', 'USER'],
    }),
    // updateUserRoles: builder.mutation<IRole, { id: number; roleIds: number[] }>(
    //   {
    //     query: ({ id, roleIds }) => ({
    //       method: "PUT",
    //       url: `users/${id}/roles`,
    //       body: roleIds
    //     }),
    //     invalidatesTags: ["USER"]
    //   }
    // ),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useRestoreUserMutation,
  useCreateUserMutation,
  // useUpdateUserRolesMutation,
} = usersApiSlice;
