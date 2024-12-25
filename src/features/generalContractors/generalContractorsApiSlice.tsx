import {
  IGeneralContractor,
  IGeneralContractorRequest, // IGeneralContractorResponse,
  // IGeneralContractorCreate,
} from '@/features/generalContractors/types';
import { apiSlice } from '@/app/api/apiSlice';
import { PaginatedResponse } from '@/utils/responseUtils';
import { paginationInit } from '@/utils/requestUtils';
import { ICert, IOrg } from '../generalTypes';

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
    createGeneralContractor: builder.mutation<IGeneralContractor, IOrg>({
      query: (body) => ({
        method: 'POST',
        url: '/general_contractors',
        body,
      }),
      invalidatesTags: ['GENERAL_CONTRACTORS', 'GENERAL_CONTRACTOR'],
    }),
    updateGeneralContractorOrg: builder.mutation<
      string,
      { id: string; org: IOrg }
    >({
      query: ({ id, org }) => ({
        url: `/general_contractors/${id}`,
        method: 'PUT',
        body: org,
      }),
      invalidatesTags: ['GENERAL_CONTRACTORS', 'GENERAL_CONTRACTOR'],
    }),
    updateGeneralContractorCert: builder.mutation<
      string,
      { id: string; cert: ICert }
    >({
      query: ({ id, cert }) => ({
        url: `/general_contractors/${id}`,
        method: 'PUT',
        body: cert,
      }),
      invalidatesTags: ['GENERAL_CONTRACTORS', 'GENERAL_CONTRACTOR'],
    }),

    // deleteGeneralContractor: builder.mutation<string, string>({
    //   query: (id) => ({
    //     method: 'DELETE',
    //     url: `/general_contractors/${id}`,
    //   }),
    //   invalidatesTags: ['GENERAL_CONTRACTORS'],
    // }),
  }),
});

export const {
  useGetGeneralContractorsQuery,
  useGetGeneralContractorQuery,
  useCreateGeneralContractorMutation,
  useUpdateGeneralContractorOrgMutation,
  useUpdateGeneralContractorCertMutation,
} = generalContractors;
