
import { apiSlice } from '../apiSlice';
import {  Ride } from '@/types/RideHistory';
import {  Page } from '@/types/Page';

const rideHistory = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRideHistory: builder.query<Page<Ride>, number>({
      query: (page) => `/ride-history?page=${page}`
    })
  })
})

export const { useGetRideHistoryQuery } = rideHistory;