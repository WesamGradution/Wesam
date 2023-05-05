import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const api = createApi({
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:5000/"}),
    reducerPath:"adminApi",
    tagTypes:["User"],
    endpoints:(build) =>({
        getFormInfo:build.query({
            query:() => "form",
            providesTags:["User"]
        }),
        postFormInfo:build.mutation({
            query: (data) =>({
                url:"/form",
                method:"POST",
                body:data,
                invalidatesTags:["User"]
            })
        })
    })
})

export const {useGetFormInfoQuery, usePostFormInfoMutation} = api