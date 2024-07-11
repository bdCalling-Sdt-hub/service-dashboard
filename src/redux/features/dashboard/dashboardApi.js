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
            query:(args)=>{
                const params = new URLSearchParams();
                if (args) {
                  args.forEach((item) => {
                    params.append(item.name, item.value);
                  });
                }
                return{
                url:'/adminall/recentTransactionFilter',
                method:'GET',
                params:params,
            }}
        }),
    })
})

export const {useGetAllStatusQuery,useGetChartQuery,useGetRecentTransactionQuery} = dashboardApi;