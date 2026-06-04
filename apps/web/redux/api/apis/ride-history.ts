
import { apiSlice } from '../apiSlice';
import { Ride, RideDetail } from '@/types/RideHistory';
import { Page } from '@/types/Page';

const rideHistory = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRideHistory: builder.query<Page<Ride>, { page: number; size: number }>({
      query: ({ page, size }) => `/ride?page=${page}&size=${size}`
    }),
    getRide: builder.query<RideDetail, string>({
      query: (id) => `/ride/${id}`
    })
  })
})

export const { useGetRideHistoryQuery, useGetRideQuery } = rideHistory;
