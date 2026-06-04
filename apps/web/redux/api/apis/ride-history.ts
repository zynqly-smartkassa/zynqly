
import { apiSlice } from '../apiSlice';
import { Ride, RideDetail } from '@/types/RideHistory';
import { Page } from '@/types/Page';

const rideHistory = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRideHistory: builder.query<Page<Ride>, number>({
      query: (page) => `/ride?page=${page}`
    }),
    getRide: builder.query<RideDetail, string>({
      query: (id) => `/ride/${id}`
    })
  })
})

export const { useGetRideHistoryQuery, useGetRideQuery } = rideHistory;
