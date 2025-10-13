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

// Define the update request structure
interface UpdateOldRegistryRequest {
  wezipe_alan_adam?: string;
  ady_alan_adam?: string;
  sene_san_sertnama?: string;
  ady_paychy_alan?: string;
  sene_paychy_alan?: string;
}

// Define the update response structure
interface UpdateOldRegistryResponse {
  message: string;
  data: OldRegistry;
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
    updateOldRegistry: builder.mutation<
      UpdateOldRegistryResponse,
      { id: string; data: UpdateOldRegistryRequest }
    >({
      query: ({ id, data }) => ({
        url: `/old-registries/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['OLD_REGISTRY', 'OLD_REGISTRIES'],
    }),
  }),
});

export const {
  useGetOldRegistriesQuery,
  useGetOldRegistryQuery,
  useUpdateOldRegistryMutation,
} = oldRegistriesApiSlice;
