import { baseApi } from "../api/baseApi";

const notification = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getNotifications: builder.query({
            query: () => ({
                url: '/notifaction/getNotifaction',
                method: 'GET',
                // params: args,
            }),
        }),
    }),
})

export const { useGetNotificationsQuery } = notification;