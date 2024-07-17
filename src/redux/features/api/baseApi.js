import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    // baseUrl: 'https://3c8c-103-43-151-152.ngrok-free.app/api/v1',
    baseUrl: 'http://192.168.10.156:4040/api/v1',
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().auth
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['Withdraw'],
  endpoints: () => ({
  })
})