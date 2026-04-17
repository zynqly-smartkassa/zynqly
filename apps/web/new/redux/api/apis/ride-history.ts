
import { apiSlice } from '../apiSlice';
import { SpringPage, Ride } from '@/types/RideHistory';

const rideHistory = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRideHistory: builder.query<SpringPage<Ride>, number>({
      query: (page) => `/ride-history?page=${page}`
    })
  })
})

export const { useGetRideHistoryQuery } = rideHistory;