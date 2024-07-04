import { baseApi } from "../api/baseApi";

const settingsApi = baseApi.injectEndpoints({
    endpoints:(builder) => ({
        getPrivacy:builder.query({
            query:()=>({
                url:'/users/showPrivacy',
                method:'GET'
            })
        }),
        updatePrivacy:builder.mutation({
            query:({data,id})=>({
                url:`/adminall/updatePrivacy/${id}`,
                method:'PATCH',
                body:data
            })
        })
    })
})

export const {useGetPrivacyQuery,useUpdatePrivacyMutation} = settingsApi