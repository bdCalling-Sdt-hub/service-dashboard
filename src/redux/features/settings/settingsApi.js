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
        }),
        getTermsAndCondition:builder.query({
            query:()=>({
                url:'/users/showTermsAndCondation',
                method:'GET'
            })
        }),
        updateTermsAndCondition:builder.mutation({
            query:({data,id})=>({
                url:`/adminall/updateTerms/${id}`,
                method:'PATCH',
                body:data
            })
        }),
        getAboutUs:builder.query({
            query:()=>({
                url:'/users/showAboutUs',
                method:'GET'
            })
        }),
        updateAboutUs:builder.mutation({
            query:({data,id})=>({
                url:`/adminall/updateAbout/${id}`,
                method:'PATCH',
                body:data
            })
        })
    })
})

export const {useGetPrivacyQuery,useUpdatePrivacyMutation,useGetTermsAndConditionQuery,useUpdateAboutUsMutation,useGetAboutUsQuery,useUpdateTermsAndConditionMutation} = settingsApi