import { baseApi } from "../api/baseApi";

const categoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addCategories: builder.mutation({
            query: (formdata) => ({
                url: '/admin/createCategory',
                method: 'POST',
                body: formdata,
            })
        }),
        getCategories: builder.query({
            query: () => ({
                url: '/admin/showAllcategory',
                method: 'GET',
            })
        }),
        getSingleCategories: builder.query({
            query: (id) => ({
                url: `/admin/showSingelCategory?id=${id}`,
                method: 'GET',
            })
        }),
        updateCategories: builder.mutation({
            query: ({formdata,id}) => ({
                url: `/admin/updateCategory/${id}`,
                method: 'PATCH',
                body: formdata,

            })
        }),
        deleteCategories: builder.mutation({
            query: (id) => ({
                url: `/admin/deleteCategory/${id}`,
                method: 'DELETE',
            })
        })
    })
});

export const { 
    useAddCategoriesMutation, 
    useGetCategoriesQuery,
    useGetSingleCategoriesQuery,
   useUpdateCategoriesMutation,
    useDeleteCategoriesMutation 
} = categoryApi;
