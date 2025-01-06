import {
  IBuilding,
  IBuildingCert,
  IBuildingMain,
  IBuildingOrder,
  IBuildingRequest, // IBuildingResponse,
  IBuildingSquare
  // IBuildingCreate,
} from '@/features/buildings/types';
import { apiSlice } from '@/app/api/apiSlice';
import { PaginatedResponse } from '@/utils/responseUtils';
import { paginationInit } from '@/utils/requestUtils';
import { IAreaStreetForm } from '@/components/form/AreaStreetForm';

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
    createBuilding: builder.mutation<IBuilding, IAreaStreetForm>({
      query: (body) => ({
        method: 'POST',
        url: '/buildings',
        body
      }),
      invalidatesTags: ['BUILDINGS', 'BUILDING']
    }),
    updateBuildingAddress: builder.mutation<
      string,
      { id: string } & IAreaStreetForm
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
    }),
    updateBuildingOrder: builder.mutation<
      string,
      { id: string } & IBuildingOrder
    >({
      query: ({ id, ...body }) => ({
        url: `/buildings/${id}/update_order`,
        method: 'PUT',
        body
      }),
      invalidatesTags: ['BUILDINGS', 'BUILDING']
    }),
    updateBuildingCert: builder.mutation<
      string,
      { id: string } & IBuildingCert
    >({
      query: ({ id, ...body }) => ({
        url: `/buildings/${id}/update_cert`,
        method: 'PUT',
        body
      }),
      invalidatesTags: ['BUILDINGS', 'BUILDING']
    }),
    updateBuildingSquare: builder.mutation<
      string,
      { id: string } & IBuildingSquare
    >({
      query: ({ id, ...body }) => ({
        url: `/buildings/${id}/update_square`,
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
  useUpdateBuildingMainMutation,
  useUpdateBuildingOrderMutation,
  useUpdateBuildingCertMutation,
  useUpdateBuildingSquareMutation
} = buildingsApiSlice;
