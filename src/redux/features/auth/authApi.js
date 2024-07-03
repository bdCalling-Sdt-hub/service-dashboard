import { baseApi } from "../api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints:(builder) => ({
        signIn:builder.mutation({
            query:(data)=>({
                url:'/users/signIn',
                method:'POST',
                body:data
            }),
        }),
        forgotPassword: builder.mutation({
            query:(data)=> ({
                url:'/users/forgotPassword',
                method:'POST',
                 body:data
             })
            
        }),
        verifyOtp : builder.mutation({
            query:(data)=> ({
                url:'/users/verify',
                method:'POST',
                 body:data
             })
        }),
        changePassword : builder.mutation({
            query:(data)=> ({
                url:'/users/cahngePassword',
                method:'POST',
                body:data
             })
        }),
        changePasswordUseingOldPassword : builder.mutation({
            query:(data)=> ({
                url:'/users/changePasswordUseingOldPassword',
                method:'POST',
                body:data
             })
        })
    })
})

export const {useSignInMutation,useForgotPasswordMutation,useVerifyOtpMutation,useChangePasswordMutation,useChangePasswordUseingOldPasswordMutation} = authApi;