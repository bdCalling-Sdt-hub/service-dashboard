import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const baseApi = createApi({
    reducerPath:'api',
    baseQuery:fetchBaseQuery({
        baseUrl:'http://192.168.10.156:4040/api/v1',
        prepareHeaders: (headers, { getState }) => {
            const {token} = getState().auth
            if (token) {
              headers.set('authorization', `Bearer ${token}`)
            }
            return headers
          },
    }),
    endpoints:()=>({
    })
})