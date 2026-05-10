import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1`,
    prepareHeaders: (headers, { getState }) => {
      // get RootState
      const state = getState() as any;

      // Is there already a token?
      const tk =
        state.api.queries["getAccessTk(undefined)"]?.data?.accessTk;

      if (tk) {
        headers.set("authorization", `Bearer ${tk}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Invoices"],
  endpoints: () => ({}),
});
