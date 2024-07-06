import { baseApi } from "../api/baseApi";

const usersApi = baseApi.injectEndpoints({
    endpoints:(builder) => ({
        getUsers:builder.query({
            query:(args)=>{
                const params = new URLSearchParams();
                if (args) {
                  args.forEach((item) => {
                    params.append(item.name, item.value);
                  });
                }
               return{ 
                url:'/adminall/getAllusers',
                method:'GET',
                params:params
            }
            }
        })
    })
})

export const {useGetUsersQuery} = usersApi;