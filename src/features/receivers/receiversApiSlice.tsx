import { IReceiver, IReceiverRequest } from '@/features/receivers/types';
import { apiSlice } from '@/app/api/apiSlice';
import { PaginatedResponse } from '@/utils/responseUtils';
import { paginationInit } from '@/utils/requestUtils';

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ['RECEIVERS', 'RECEIVER']
});

export const receiversApiSlice = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getReceivers: builder.query<
      PaginatedResponse<IReceiver[]>,
      IReceiverRequest
    >({
      query: ({
        page = paginationInit.page,
        pageSize = paginationInit.pageSize,
        search = ''
      }) => `/receivers?page=${page}&pageSize=${pageSize}&search=${search}`,
      providesTags: ['RECEIVERS']
      // keepUnusedDataFor: 5,
    }),
    getReceiver: builder.query<IReceiver, string>({
      query: (id) => `/receivers/${id}`,
      providesTags: ['RECEIVER']
    }),
    createReceiver: builder.mutation<IReceiver, IReceiver>({
      query: (body) => ({
        method: 'POST',
        url: '/receivers',
        body
      }),
      invalidatesTags: ['RECEIVERS', 'RECEIVER']
    }),
    updateReceiverOrg: builder.mutation<
      IReceiver,
      { id: string; receiver: IReceiver }
    >({
      query: ({ id, receiver }) => ({
        url: `/receivers/${id}`,
        method: 'PUT',
        body: receiver
      }),
      invalidatesTags: ['RECEIVERS', 'RECEIVER']
    }),
    deleteReceiver: builder.mutation<string, string>({
      query: (id) => ({
        method: 'DELETE',
        url: `/receivers/${id}`
      }),
      invalidatesTags: ['RECEIVERS']
    })
  })
});

export const {
  useGetReceiversQuery,
  useGetReceiverQuery,
  useCreateReceiverMutation,
  useUpdateReceiverOrgMutation,
  useDeleteReceiverMutation
} = receiversApiSlice;
