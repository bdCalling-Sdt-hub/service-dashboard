import { baseApi } from "../api/baseApi";

const providerApi = baseApi.injectEndpoints({
    endpoints:(builder) => ({
        getProviders:builder.query({
            query:()=>({
                url:'/adminall/getAllProvider',
                method:'GET'
            })
        })
    })
})
export const {useGetProvidersQuery} = providerApi