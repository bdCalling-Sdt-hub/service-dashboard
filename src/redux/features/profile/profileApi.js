import { baseApi } from "../api/baseApi";

const profileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        updateProfile: builder.mutation({
            query: (formdata) => ({
                url: '/adminall/updateProfile',
                method: 'PATCH',
                body: formdata,
            })
        })
    })
})
export const {useUpdateProfileMutation} = profileApi