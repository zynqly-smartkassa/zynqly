import { apiSlice } from '../apiSlice';

const dashboard = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getShout: builder.query<string, string>({
      query: (username) => `/shout/${username}/`,
    }),

  })
})

export const {useGetShoutQuery} = dashboard;