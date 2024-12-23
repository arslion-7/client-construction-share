import {
  IGeneralContractor,
  IGeneralContractorRequest, // IGeneralContractorResponse,
  // IGeneralContractorCreate,
} from '@/features/generalContractors/types';
import { apiSlice } from '@/app/api/apiSlice';
import { PaginatedResponse } from '@/utils/responseUtils';
import { paginationInit } from '@/utils/requestUtils';

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ['GENERAL_CONTRACTORS', 'GENERAL_CONTRACTOR'],
});

export const generalContractors = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getGeneralContractors: builder.query<
      PaginatedResponse<IGeneralContractor[]>,
      IGeneralContractorRequest
    >({
      query: ({
        page = paginationInit.page,
        pageSize = paginationInit.pageSize,
        search = '',
      }) =>
        `/general_contractors?page=${page}&pageSize=${pageSize}&search=${search}`,
      providesTags: ['GENERAL_CONTRACTORS'],
      // keepUnusedDataFor: 5,
    }),
    getGeneralContractor: builder.query<IGeneralContractor, string>({
      query: (id) => `/general_contractors/${id}`,
      providesTags: ['GENERAL_CONTRACTOR'],
    }),
    // updateGeneralContractor: builder.mutation<
    //   string,
    //   { id: number; general_contractor: IGeneralContractorUpdateRequest }
    // >({
    //   query: ({ id, general_contractor }) => ({
    //     url: `/general_contractors/${id}`,
    //     method: 'PUT',
    //     body: general_contractor,
    //   }),
    //   invalidatesTags: ['GENERAL_CONTRACTORS', 'GENERAL_CONTRACTOR'],
    // }),
    // deleteGeneralContractor: builder.mutation<string, string>({
    //   query: (id) => ({
    //     method: 'DELETE',
    //     url: `/general_contractors/${id}`,
    //   }),
    //   invalidatesTags: ['GENERAL_CONTRACTORS'],
    // }),

    // createGeneralContractor: builder.mutation<
    //   IGeneralContractorResponse,
    //   IGeneralContractorCreate
    // >({
    //   query: (body) => ({
    //     method: 'POST',
    //     url: '/general_contractors',
    //     body,
    //   }),
    //   invalidatesTags: ['GENERAL_CONTRACTORS', 'GENERAL_CONTRACTOR'],
    // }),
  }),
});

export const { useGetGeneralContractorsQuery, useGetGeneralContractorQuery } =
  generalContractors;
