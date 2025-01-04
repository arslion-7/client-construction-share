import {
  IBuilding,
  IBuildingMain,
  IBuildingRequest // IBuildingResponse,
  // IBuildingCreate,
} from '@/features/buildings/types';
import { apiSlice } from '@/app/api/apiSlice';
import { PaginatedResponse } from '@/utils/responseUtils';
import { paginationInit } from '@/utils/requestUtils';
import { IAddressForm } from '@/components/form/AreaForm';

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ['BUILDINGS', 'BUILDING']
});

export const buildingsApiSlice = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getBuildings: builder.query<
      PaginatedResponse<IBuilding[]>,
      IBuildingRequest
    >({
      query: ({
        page = paginationInit.page,
        pageSize = paginationInit.pageSize,
        search = ''
      }) => `/buildings?page=${page}&pageSize=${pageSize}&search=${search}`,
      providesTags: ['BUILDINGS']
      // keepUnusedDataFor: 5,
    }),
    getBuilding: builder.query<IBuilding, string>({
      query: (id) => `/buildings/${id}`,
      providesTags: ['BUILDING']
    }),
    createBuilding: builder.mutation<IBuilding, IAddressForm>({
      query: (body) => ({
        method: 'POST',
        url: '/buildings',
        body
      }),
      invalidatesTags: ['BUILDINGS', 'BUILDING']
    }),
    updateBuildingAddress: builder.mutation<
      string,
      { id: string } & IAddressForm
    >({
      query: ({ id, areas, street }) => ({
        url: `/buildings/${id}/update_address`,
        method: 'PUT',
        body: {
          areas,
          street
        }
      }),
      invalidatesTags: ['BUILDINGS', 'BUILDING']
    }),
    updateBuildingMain: builder.mutation<
      string,
      { id: string } & IBuildingMain
    >({
      query: ({ id, ...body }) => ({
        url: `/buildings/${id}/update_main`,
        method: 'PUT',
        body
      }),
      invalidatesTags: ['BUILDINGS', 'BUILDING']
    })

    // deleteBuilding: builder.mutation<string, string>({
    //   query: (id) => ({
    //     method: 'DELETE',
    //     url: `/buildings/${id}`,
    //   }),
    //   invalidatesTags: ['BUILDINGS'],
    // }),
  })
});

export const {
  useGetBuildingsQuery,
  useGetBuildingQuery,
  useCreateBuildingMutation,
  useUpdateBuildingAddressMutation,
  useUpdateBuildingMainMutation
} = buildingsApiSlice;
