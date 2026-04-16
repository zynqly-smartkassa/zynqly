
import { apiSlice } from '../apiSlice';
import { RideHistory } from '@/types/RideHistory';

const rideHistory = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRideHistory: builder.query<RideHistory, void>({
      query: () => "/ride-history"
    })
  })
})

export const {useGetRideHistoryQuery} = rideHistory;