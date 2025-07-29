import { apiSlice } from '@/app/api/apiSlice';
import { OldRegistry } from './types';

// Define the response structure that matches the backend
interface OldRegistriesResponse {
  data: OldRegistry[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ['OLD_REGISTRIES', 'OLD_REGISTRY'],
});

export const oldRegistriesApiSlice = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getOldRegistries: builder.query<
      OldRegistriesResponse,
      { page?: number; limit?: number; search?: string }
    >({
      query: ({ page = 1, limit = 10, search = '' }) =>
        `/old-registries?page=${page}&limit=${limit}&search=${search}`,
      providesTags: ['OLD_REGISTRIES'],
    }),
    getOldRegistry: builder.query<OldRegistry, string>({
      query: (id) => `/old-registries/${id}`,
      providesTags: ['OLD_REGISTRY'],
    }),
  }),
});

export const { useGetOldRegistriesQuery, useGetOldRegistryQuery } =
  oldRegistriesApiSlice;
