import { baseApi } from "../api/baseApi";

const withdrawApi = baseApi.injectEndpoints({
    endpoints:(builder) => ({
        getWithdraw:builder.query({
            query:(args)=>{
                const params = new URLSearchParams();
                if (args) {
                  args.forEach((item) => {
                    params.append(item.name, item.value);
                  });
                }
                return{
                url:'/withdrow/admin/getWithdrowList',
                method:'GET',
                params:params,
            }},
            providesTags:["Withdraw"]
        }),
        approvedWithdraw: builder.mutation({
          query:(id)=>({
            url:`/withdrow/approvedWithdrow?id=${id}`,
            method:'PATCH',
          }),
          invalidatesTags:["Withdraw"]
        }),
        cancelWithdraw: builder.mutation({
          query:(id)=>({
            url:`/withdrow/canceledWithdrow?id=${id}`,
            method:'PATCH',
          }),
          invalidatesTags:["Withdraw"]
        })
    })
})
export const {useGetWithdrawQuery,useApprovedWithdrawMutation,useCancelWithdrawMutation} = withdrawApi