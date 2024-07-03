import { baseApi } from "../api/baseApi";

const statusApi = baseApi.injectEndpoints({
    endpoints:(builder) => ({
        getAllStatus:builder.query({
            query:()=>({
                url:'/adminall/totalOfDashboared',
                method:'GET'
            })
        }),
        getChart:builder.query({
            query:()=>({
                url:'/adminall/earningGraph',
                method:'GET'
            })
        })
    })
})
export const {useGetAllStatusQuery,useGetChartQuery} = statusApi