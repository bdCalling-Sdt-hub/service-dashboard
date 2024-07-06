import { baseApi } from "../api/baseApi";

const withdrawApi = baseApi.injectEndpoints({
    endpoints:(builder) => ({
        getWithdraw:builder.query({
            query:()=>({
                url:'/withdrow/admin/getWithdrowList',
                method:'GET'
            })
        })
    })
})
export const {useGetWithdrawQuery} = withdrawApi