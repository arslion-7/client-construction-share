import {
  IShareholder,
  IShareholderDocs,
  IShareholderRequest,
} from '@/features/shareholders/types';
import { apiSlice } from '@/app/api/apiSlice';
import { PaginatedResponse } from '@/utils/responseUtils';
import { paginationInit } from '@/utils/requestUtils';
import { IAreaAddressForm } from '@/components/form/AreaAddressForm';
import { IOrg } from '../generalTypes';

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ['SHAREHOLDERS', 'SHAREHOLDER'],
});

export const shareholdersApiSlice = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getShareholders: builder.query<
      PaginatedResponse<IShareholder[]>,
      IShareholderRequest
    >({
      query: ({
        page = paginationInit.page,
        pageSize = paginationInit.pageSize,
        search = '',
      }) => `/shareholders?page=${page}&pageSize=${pageSize}&search=${search}`,
      providesTags: ['SHAREHOLDERS'],
      // keepUnusedDataFor: 5,
    }),
    getShareholder: builder.query<IShareholder, string>({
      query: (id) => `/shareholders/${id}`,
      providesTags: ['SHAREHOLDER'],
    }),
    createShareholder: builder.mutation<IShareholder, IAreaAddressForm>({
      query: (body) => ({
        method: 'POST',
        url: '/shareholders',
        body,
      }),
      invalidatesTags: ['SHAREHOLDERS', 'SHAREHOLDER'],
    }),
    updateShareholderAddress: builder.mutation<
      string,
      { id: string } & IAreaAddressForm
    >({
      query: ({ id, areas, address, address_additional_info }) => ({
        url: `/shareholders/${id}/update_address`,
        method: 'PUT',
        body: {
          areas,
          address,
          address_additional_info,
        },
      }),
      invalidatesTags: ['SHAREHOLDERS', 'SHAREHOLDER'],
    }),
    updateShareholderDocs: builder.mutation<
      string,
      { id: string } & IShareholderDocs
    >({
      query: ({ id, ...rest }) => ({
        url: `/shareholders/${id}/update_docs`,
        method: 'PUT',
        body: {
          ...rest,
        },
      }),
      invalidatesTags: ['SHAREHOLDERS', 'SHAREHOLDER'],
    }),
    updateShareholderOrg: builder.mutation<string, { id: string; org: IOrg }>({
      query: ({ id, org }) => ({
        url: `/shareholders/${id}/org`,
        method: 'PUT',
        body: org,
      }),
      invalidatesTags: ['SHAREHOLDERS', 'SHAREHOLDER'],
    }),
    deleteShareholder: builder.mutation<string, string>({
      query: (id) => ({
        method: 'DELETE',
        url: `/shareholders/${id}`,
      }),
      invalidatesTags: ['SHAREHOLDERS'],
    }),
  }),
});

export const {
  useGetShareholdersQuery,
  useGetShareholderQuery,
  useCreateShareholderMutation,
  useUpdateShareholderAddressMutation,
  useUpdateShareholderDocsMutation,
  useUpdateShareholderOrgMutation,
} = shareholdersApiSlice;
