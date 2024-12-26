import { apiSlice } from '@/app/api/apiSlice';
import { PaginatedResponse } from '@/utils/responseUtils';
import { paginationInit } from '@/utils/requestUtils';
import { IRegistry, IRegistryRequest } from './types';

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ['REGISTRIES', 'REGISTRY']
});

export const registriesApiSlice = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getRegistries: builder.query<
      PaginatedResponse<IRegistry[]>,
      IRegistryRequest
    >({
      query: ({
        page = paginationInit.page,
        pageSize = paginationInit.pageSize,
        search = ''
      }) => `/registries?page=${page}&pageSize=${pageSize}&search=${search}`,
      providesTags: ['REGISTRIES']
      // keepUnusedDataFor: 5,
    })
    // getRegistry: builder.query<IRegistry, string>({
    //   query: (id) => `/registries/${id}`,
    //   providesTags: ['REGISTRY']
    // }),
    // createRegistry: builder.mutation<IRegistry, IOrg>({
    //   query: (body) => ({
    //     method: 'POST',
    //     url: '/registries',
    //     body
    //   }),
    //   invalidatesTags: ['REGISTRIES', 'REGISTRY']
    // })
    // updateRegistryOrg: builder.mutation<
    //   string,
    //   { id: string; org: IOrg }
    // >({
    //   query: ({ id, org }) => ({
    //     url: `/registries/${id}`,
    //     method: 'PUT',
    //     body: org
    //   }),
    //   invalidatesTags: ['REGISTRIES', 'REGISTRY']
    // })
  })
});

export const { useGetRegistriesQuery } = registriesApiSlice;
