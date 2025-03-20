import { apiSlice } from '@/app/api/apiSlice';
import { PaginatedResponse } from '@/utils/responseUtils';
import { paginationInit } from '@/utils/requestUtils';
import { IRegistry, IRegistryDates, IRegistryRequest } from './types';

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ['REGISTRIES', 'REGISTRY'],
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
        search = '',
      }) => `/registries?page=${page}&pageSize=${pageSize}&search=${search}`,
      providesTags: ['REGISTRIES'],
      // keepUnusedDataFor: 5,
    }),

    getRegistry: builder.query<IRegistry, string>({
      query: (id) => `/registries/${id}`,
      providesTags: ['REGISTRY'],
    }),
    createRegistry: builder.mutation<IRegistry, void>({
      query: () => ({
        method: 'POST',
        url: '/registries',
        // body,
      }),
      invalidatesTags: ['REGISTRIES', 'REGISTRY'],
    }),
    updateRegistryNumber: builder.mutation<
      IRegistry,
      { id: string; t_b: number }
    >({
      query: ({ id, t_b }) => ({
        method: 'PUT',
        url: `/registries/${id}/registry_number`,
        body: {
          t_b,
        },
      }),
      invalidatesTags: ['REGISTRIES', 'REGISTRY'],
    }),
    updateRegistryDates: builder.mutation<
      IRegistry,
      { id: string } & IRegistryDates
    >({
      query: ({ id, reviewed_at, registered_at }) => ({
        method: 'PUT',
        url: `/registries/${id}/registry_dates`,
        body: {
          reviewed_at,
          registered_at,
        },
      }),
      invalidatesTags: ['REGISTRIES', 'REGISTRY'],
    }),
    selectGeneralContractor: builder.mutation<
      IRegistry,
      { id: string; general_contractor_id: number }
    >({
      query: ({ id, general_contractor_id }) => ({
        method: 'PUT',
        url: `/registries/${id}/general_contractor`,
        body: {
          general_contractor_id,
        },
      }),
      invalidatesTags: ['REGISTRIES', 'REGISTRY'],
    }),
    selectBuilding: builder.mutation<
      IRegistry,
      { id: string; building_id: number }
    >({
      query: ({ id, building_id }) => ({
        method: 'PUT',
        url: `/registries/${id}/building`,
        body: {
          building_id,
        },
      }),
      invalidatesTags: ['REGISTRIES', 'REGISTRY'],
    }),
    selectBuilder: builder.mutation<
      IRegistry,
      { id: string; builder_id: number }
    >({
      query: ({ id, builder_id }) => ({
        method: 'PUT',
        url: `/registries/${id}/builder`,
        body: {
          builder_id,
        },
      }),
      invalidatesTags: ['REGISTRIES', 'REGISTRY'],
    }),
    selectReceiver: builder.mutation<
      IRegistry,
      { id: string; receiver_id: number }
    >({
      query: ({ id, receiver_id }) => ({
        method: 'PUT',
        url: `/registries/${id}/receiver`,
        body: {
          receiver_id,
        },
      }),
      invalidatesTags: ['REGISTRIES', 'REGISTRY'],
    }),
    selectShareholder: builder.mutation<
      IRegistry,
      { id: string; shareholder_id: number }
    >({
      query: ({ id, shareholder_id }) => ({
        method: 'PUT',
        url: `/registries/${id}/shareholder`,
        body: {
          shareholder_id,
        },
      }),
      invalidatesTags: ['REGISTRIES', 'REGISTRY'],
    }),
  }),
});

export const {
  useGetRegistriesQuery,
  useGetRegistryQuery,
  useCreateRegistryMutation,
  useUpdateRegistryNumberMutation,
  useUpdateRegistryDatesMutation,
  useSelectGeneralContractorMutation,
  useSelectBuildingMutation,
  useSelectBuilderMutation,
  useSelectReceiverMutation,
  useSelectShareholderMutation,
} = registriesApiSlice;
