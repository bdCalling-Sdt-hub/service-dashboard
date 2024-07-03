import { baseApi } from "../api/baseApi";

const usersApi = baseApi.injectEndpoints({
    endpoints:(builder) => ({
        getUsers:builder.query({
            query:()=>({
                url:'/adminall/getAllusers',
                method:'GET'
            })
        })
    })
})

export const {useGetUsersQuery} = usersApi;