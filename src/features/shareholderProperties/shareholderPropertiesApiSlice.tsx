import { apiSlice } from '@/app/api/apiSlice';
import { IShareholderProperty } from './types';

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ['SHAREHOLDER_PROPERTY'],
});

export const shareholderPropertiesApiSlice = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getShareholderProperty: builder.query<
      IShareholderProperty,
      { registryId: string }
    >({
      query: ({ registryId }) =>
        `/shareholder_properties?registryId=${registryId}`,
      providesTags: ['SHAREHOLDER_PROPERTY'],
    }),
    createShareholderProperty: builder.mutation<
      IShareholderProperty,
      { shareholderProperty: IShareholderProperty; registryId: string }
    >({
      query: ({ shareholderProperty, registryId }) => ({
        method: 'POST',
        url: `/shareholder_properties?registryId=${registryId}`,
        body: { ...shareholderProperty },
      }),
      invalidatesTags: ['SHAREHOLDER_PROPERTY'],
    }),
    updateShareholderProperty: builder.mutation<
      IShareholderProperty,
      { shareholderProperty: IShareholderProperty; id: number }
    >({
      query: ({ shareholderProperty, id }) => ({
        method: 'PUT',
        url: `/shareholder_properties/${id}`,
        body: { ...shareholderProperty },
      }),
      invalidatesTags: ['SHAREHOLDER_PROPERTY'],
    }),
    deleteShareholderProperty: builder.mutation<string, string>({
      query: (id) => ({
        method: 'DELETE',
        url: `/shareholder_properties/${id}`,
      }),
      invalidatesTags: ['SHAREHOLDER_PROPERTY'],
    }),
  }),
});

export const {
  useGetShareholderPropertyQuery,
  useCreateShareholderPropertyMutation,
  useUpdateShareholderPropertyMutation,
} = shareholderPropertiesApiSlice;
