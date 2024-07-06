import { baseApi } from "../api/baseApi";

const dashboardApi = baseApi.injectEndpoints({
    endpoints:(builder) => ({
        getAllStatus:builder.query({
            query:()=>({
                url:'/adminall/totalOfDashboared',
                method:'GET'
            })
        }),
        GetChart:builder.query({
            query:(year)=>({
                url:`/adminall/earningGraph/?year=${year}`,
                method:'GET'
            })
        }),
        getRecentTransaction:builder.query({
            query:()=>({
                url:'/adminall/recentTransactionFilter',
                method:'GET'
            })
        }),
        getAllTransactions:builder.query({
            query:()=>({
                url:'/adminall/recentTransaction',
                method:'GET'
            })
        })
    })
})

export const {useGetAllStatusQuery,useGetChartQuery,useGetRecentTransactionQuery,useGetAllTransactionsQuery} = dashboardApi;