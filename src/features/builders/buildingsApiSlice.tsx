import { IBuilder, IBuilderRequest } from '@/features/builders/types';
import { apiSlice } from '@/app/api/apiSlice';
import { PaginatedResponse } from '@/utils/responseUtils';
import { paginationInit } from '@/utils/requestUtils';
import { IAddressForm } from '@/components/form/AreaForm';

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ['BUILDERS', 'BUILDER']
});

export const buildersApiSlice = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getBuilders: builder.query<PaginatedResponse<IBuilder[]>, IBuilderRequest>({
      query: ({
        page = paginationInit.page,
        pageSize = paginationInit.pageSize,
        search = ''
      }) => `/builders?page=${page}&pageSize=${pageSize}&search=${search}`,
      providesTags: ['BUILDERS']
      // keepUnusedDataFor: 5,
    }),
    getBuilder: builder.query<IBuilder, string>({
      query: (id) => `/builders/${id}`,
      providesTags: ['BUILDER']
    }),
    createBuilder: builder.mutation<IBuilder, IAddressForm>({
      query: (body) => ({
        method: 'POST',
        url: '/builders',
        body
      }),
      invalidatesTags: ['BUILDERS', 'BUILDER']
    }),
    updateBuilderAddress: builder.mutation<
      string,
      { id: string } & IAddressForm
    >({
      query: ({ id, areas, street }) => ({
        url: `/builders/${id}/update_address`,
        method: 'PUT',
        body: {
          areas,
          street
        }
      }),
      invalidatesTags: ['BUILDERS', 'BUILDER']
    })
    // deleteBuilder: builder.mutation<string, string>({
    //   query: (id) => ({
    //     method: 'DELETE',
    //     url: `/builders/${id}`,
    //   }),
    //   invalidatesTags: ['BUILDERS'],
    // }),
  })
});

export const {
  useGetBuildersQuery,
  useGetBuilderQuery,
  useCreateBuilderMutation
} = buildersApiSlice;
