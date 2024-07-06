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
            }}
        })
    })
})
export const {useGetWithdrawQuery} = withdrawApi