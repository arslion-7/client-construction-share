import { apiSlice } from '@/app/api/apiSlice';
import { DashboardStats } from './types';

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ['DASHBOARD'],
});

export const dashboardApiSlice = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query<DashboardStats, void>({
      query: () => '/dashboard/stats',
      providesTags: ['DASHBOARD'],
    }),
  }),
});

export const { useGetDashboardStatsQuery } = dashboardApiSlice;
