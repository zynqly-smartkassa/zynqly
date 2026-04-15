import { Dashboard } from '@/types/Dashboard';
import { apiSlice } from '../apiSlice';

const dashboard = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboard: builder.query<Dashboard, void>({
      query: () => `/dashboard`,
    }),
  })
})

export const {useGetDashboardQuery} = dashboard;