import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { REHYDRATE } from 'redux-persist'

export const api = createApi({
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:5000/"}),
    reducerPath:"adminApi",
    tagTypes:["User","Quiz","Group","assignGroup","opportunity","Store","transaction","joinGroup"],
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === REHYDRATE) {
          // check if action.payload is defined and has the adminApi property
          if (action.payload && action.payload[reducerPath]) {
            return action.payload[reducerPath]
          }
        }
      },
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
        deleteForm: build.mutation({
            query: (ids) => ({
              url: `/form`,
              method: "DELETE",
              body: ids,
              invalidatesTags: ["User"]
            })
          }),
          updateForm: build.mutation({
            query: (data) => ({
              url: `/form/${data.id}`,
              method: "PUT",
              body: data,
              invalidatesTags: ["User"]
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
            query:(id)=> `groups/${id}`,
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
        }),
        getOpportunityInfo:build.query({
            query:()=> "opportunity",
            providesTags:["opportunity"]
        }),
        postOpportunityInfo:build.mutation({
            query:(data) =>({
                url:"/opportunity",
                method:"POST",
                body:data,
                invalidatesTags:["opportunity"]
            })
    }),
        getStoreInfo:build.query({
            query:()=> "store",
            providesTags:["Store"]
        }),
        postStoreInfo:build.mutation({
            query:(data) =>({
                url:"/store",
                method:"POST",
                body:data,
                invalidatesTags:["Store"]
            })
    }),
        getTransaction:build.query({
            query:()=> "transaction",
            providesTags:["transaction"]
        }),
        postTransaction:build.mutation({
            query:(data) =>({
                url:"/transaction",
                method:"POST",
                body:data,
                invalidatesTags:["transaction"]
            })
    }), 
        signUpUser:build.mutation({
            query:(data) =>({
            url:"/joinGroup/signUp",
            method:"POST",
            body:data,
            invalidatesTags:["joinGroup"]
            })
    }),
        signInUser:build.mutation({
            query:(data) =>({
            url:"/joinGroup/signIn",
            method:"POST",
            body:data,
            invalidatesTags:["joinGroup"]
            })
}),
        
})})

export const {
      useGetFormInfoQuery
    , usePostFormInfoMutation
    , useGetQuestionQuery
    , usePostQuestionMutation
    , useGetGroupInfoQuery
    , usePostGroupInfoMutation
    , usePostAssignGroupMutation
    , useGetOpportunityInfoQuery
    , usePostOpportunityInfoMutation
    , useGetStoreInfoQuery
    , usePostStoreInfoMutation
    , useGetTransactionQuery
    , usePostTransactionMutation
    , useDeleteFormMutation
    , useUpdateFormMutation
    , useSignUpUserMutation
    , useSignInUserMutation
} = api