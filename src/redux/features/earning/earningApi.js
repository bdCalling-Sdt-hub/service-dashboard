import { baseApi } from "../api/baseApi";

const earningApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEarning: builder.query({
      query: () => ({
        url: "/adminall/earningTotal",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetEarningQuery } = earningApi;
