import { apiSlice } from '@/app/api/apiSlice';
import { CascaderOption } from '@/utils/responseUtils';

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ['AREAS', 'AREA'],
});

export const areasApiSlice = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getAreaHierarchy: builder.query<
      {
        options: CascaderOption[];
      },
      void
    >({
      query: () => `areas/area_hierarchy`,
      providesTags: ['AREAS'],
      // keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetAreaHierarchyQuery } = areasApiSlice;
