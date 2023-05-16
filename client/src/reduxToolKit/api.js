import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"


export const api = createApi({
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:5000/"}),
    reducerPath:"adminApi",
    tagTypes:["User","Quiz","Group","assignGroup"],
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
        }),
        getQuestion:build.query({
            query:()=> "quiz",
            providesTags:["Quiz"]
        }),
        postQuestion:build.mutation({
            query:(data)=>({
                url:"/quiz",
                method:"POST",
                body:data,
                invalidatesTags:["Quiz"]
            })
        }),
        getGroupInfo:build.query({
            query:()=>"groups",
            providesTags:["Group"]
        }),
        postGroupInfo:build.mutation({
            query:(data) =>({
                url:"/groups",
                method:"POST",
                body:data,
                invalidatesTags:["Group"]
            })
        }),
        postAssignGroup:build.mutation({
            query:(data) =>({
                url:"/assignGroup",
                method:"POST",
                body:data,
                invalidatesTags:["assignGroup"]
            })
        })
    })
})

export const {
      useGetFormInfoQuery
    , usePostFormInfoMutation
    , useGetQuestionQuery
    , usePostQuestionMutation
    , useGetGroupInfoQuery
    , usePostGroupInfoMutation
    , usePostAssignGroupMutation
} = api