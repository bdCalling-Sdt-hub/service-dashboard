import { baseApi } from "../api/baseApi";

const providerApi = baseApi.injectEndpoints({
    endpoints:(builder) => ({
        getProviders:builder.query({
            query:(args)=>{
                const params = new URLSearchParams();
                if (args) {
                  args.forEach((item) => {
                    params.append(item.name, item.value);
                  });
                }
                return{
                url:'/adminall/getAllProvider',
                method:'GET',
                params:params
            }}
        })
    })
})
export const {useGetProvidersQuery} = providerApi