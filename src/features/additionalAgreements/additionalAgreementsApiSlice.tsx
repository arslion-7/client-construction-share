import { apiSlice } from '@/app/api/apiSlice';
import {
  AdditionalAgreement,
  CreateAdditionalAgreementRequest,
  UpdateAdditionalAgreementRequest,
} from './types';

interface GetAdditionalAgreementsResponse {
  data: AdditionalAgreement[];
}

interface CreateAdditionalAgreementResponse {
  message: string;
  data: AdditionalAgreement;
}

interface UpdateAdditionalAgreementResponse {
  message: string;
  data: AdditionalAgreement;
}

interface DeleteAdditionalAgreementResponse {
  message: string;
}

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ['ADDITIONAL_AGREEMENTS', 'ADDITIONAL_AGREEMENT'],
});

export const additionalAgreementsApiSlice = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getAdditionalAgreements: builder.query<
      GetAdditionalAgreementsResponse,
      number
    >({
      query: (registryId) => `/additional-agreements/registry/${registryId}`,
      providesTags: ['ADDITIONAL_AGREEMENTS'],
    }),
    getAdditionalAgreement: builder.query<AdditionalAgreement, number>({
      query: (id) => `/additional-agreements/${id}`,
      providesTags: ['ADDITIONAL_AGREEMENT'],
    }),
    createAdditionalAgreement: builder.mutation<
      CreateAdditionalAgreementResponse,
      CreateAdditionalAgreementRequest
    >({
      query: (data) => ({
        url: `/additional-agreements`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['ADDITIONAL_AGREEMENTS'],
    }),
    updateAdditionalAgreement: builder.mutation<
      UpdateAdditionalAgreementResponse,
      { id: number; data: UpdateAdditionalAgreementRequest }
    >({
      query: ({ id, data }) => ({
        url: `/additional-agreements/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['ADDITIONAL_AGREEMENT', 'ADDITIONAL_AGREEMENTS'],
    }),
    deleteAdditionalAgreement: builder.mutation<
      DeleteAdditionalAgreementResponse,
      number
    >({
      query: (id) => ({
        url: `/additional-agreements/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ADDITIONAL_AGREEMENTS'],
    }),
  }),
});

export const {
  useGetAdditionalAgreementsQuery,
  useGetAdditionalAgreementQuery,
  useCreateAdditionalAgreementMutation,
  useUpdateAdditionalAgreementMutation,
  useDeleteAdditionalAgreementMutation,
} = additionalAgreementsApiSlice;
