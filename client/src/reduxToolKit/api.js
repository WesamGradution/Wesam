import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { REHYDRATE } from "redux-persist";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Quiz",
    "Group",
    "assignGroup",
    "opportunity",
    "Store",
    "transaction",
    "joinGroup",
  ],
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE) {
      // check if action.payload is defined and has the adminApi property
      if (action.payload && action.payload[reducerPath]) {
        return action.payload[reducerPath];
      }
    }
  },
  endpoints: (build) => ({
    getFormInfo: build.query({
      query: (id) => `form/${id}`,
      providesTags: ["User"],
    }),
    postFormInfo: build.mutation({
      query: (data) => ({
        url: "/form",
        method: "POST",
        body: data,
        invalidatesTags: ["User"],
      }),
    }),
    deleteForm: build.mutation({
      query: (ids) => ({
        url: `/form`,
        method: "DELETE",
        body: ids,
        invalidatesTags: ["User"],
      }),
    }),
    updateForm: build.mutation({
      query: (data) => ({
        url: `/form/${data.id}`,
        method: "PUT",
        body: data,
        invalidatesTags: ["User"],
      }),
    }),

    getQuestion: build.query({
      query: () => "quiz",
      providesTags: ["Quiz"],
    }),
    getQuizTitleDescription: build.query({
      query: ({ userId, groupId }) => `quiz/quizinfo/${userId}/${groupId}`,
      providesTags: ["Quiz"],
    }),
    getQuizData: build.query({
      query: (id,quizId) => `quiz/testdata/${id}/${quizId}`,
      providesTags: ["Quiz"],
    }),
    deleteQuiz: build.mutation({
      query: (ids) => ({
        url: `/quiz`,
        method: "DELETE",
        body: ids,
        invalidatesTags: ["Quiz"],
      }),
    }),
    postQuestion: build.mutation({
      query: (data) => ({
        url: "/quiz",
        method: "POST",
        body: data,
        invalidatesTags: ["Quiz"],
      }),
    }),
    postUserScore: build.mutation({
      query: ({userId,points,score}) => ({
        url: "/quiz/finishQuiz",
        method: "PATCH",
        body: {userId,points,score},
        invalidatesTags: ["Quiz"],
      }),
    }),
    updatedQuizAttemps: build.mutation({
      query: (data) => ({
        url: `quiz/update/${data.userId}/${data.quizId}`,
        method: "PUT",
        body: data,
        invalidatesTags: ["Quiz"],
      }),
    }),
    getCompetitionForAdmin: build.query({
      query: (adminId) => `quiz/admin/${adminId}`,
      providesTags: ["Quiz"],
    }),
    // show to user the group information when he want to join by the link
    getGroupInfo: build.query({
      query: (id) => `groups/groupLink/${id}`,
      providesTags: ["Group"],
    }),
    // send the id of the group and send back the group member of it
    getMembersOfGroup: build.query({
      query: (id) => `groups/${id}`,
      providesTags: ["Group"],
    }),
    // send the id of admin and return the information of the group he have created
    getAdminGroup: build.query({
      query: (id) => `groups/admin/${id}`,
      providesTags: ["Group"],
    }),
    // so the system can see all the groups
    getAllGroupInfo: build.query({
      query: () => "/groups",
      providesTags: ["Group"],
    }),
    deleteGroup: build.mutation({
      query: (ids) => ({
        url: `/groups`,
        method: "DELETE",
        body: ids,
        invalidatesTags: ["Group"],
      }),
    }),
    deleteMembers: build.mutation({
      query: (usersId, adminId) => ({
        url: `/groups/${usersId}/${adminId}`,
        method: "DELETE",
        body: usersId,
        adminId,
        invalidatesTags: ["Group"],
      }),
    }),
    postAddUserToGroupUsingNumber: build.mutation({
      query: ({ phoneNumber, groupId }) => ({
        url: "/groups/addToGroupNumber",
        method: "POST",
        body: { phoneNumber, groupId },
        invalidatesTags: ["Group"],
      }),
    }),
    postGroupInfo: build.mutation({
      query: (data) => ({
        url: "/groups",
        method: "POST",
        body: data,
        invalidatesTags: ["Group"],
      }),
    }),
    postAssignGroup: build.mutation({
      query: (data) => ({
        url: "/assignGroup",
        method: "POST",
        body: data,
        invalidatesTags: ["assignGroup"],
      }),
    }),
    // send the opprotunuties belong to admin
    getOpportunityInfo: build.query({
      query: (id) => `opportunity/${id}`,
      providesTags: ["opportunity"],
    }),
    // send the members that join the opprotunites
    getOpportunityMembers: build.query({
      query: (id) => `opportunity/members/${id}`,
      providesTags: ["opportunity"],
    }),
    // show the opprotunutoes to the user if he in one of the group that the opprotunites is assign to
    getOpportunityUsers: build.query({
      query: (id) => `opportunity/show/${id}`,
      providesTags: ["opportunity"],
    }),
   
    deleteOpportunities: build.mutation({
      query: (ids) => ({
        url: `/opportunity`,
        method: "DELETE",
        body: ids,
        invalidatesTags: ["opportunity"],
      }),
    }),
    postOpportunityInfo: build.mutation({
      query: (data) => ({
        url: "/opportunity",
        method: "POST",
        body: data,
        invalidatesTags: ["opportunity"],
      }),
    }),
    postUserJoinOpportunity: build.mutation({
        query: (data) => ({
          url: "/opportunity/join",
          method: "POST",
          body: data,
          invalidatesTags: ["opportunity"],
        }),
      }),
    getStoreInfo: build.query({
      query: (id) => `store/admin/${id}`,
      providesTags: ["Store"],
    }),
    getUserProduct: build.query({
      query: (id) => `store/user/${id}`,
      providesTags: ["Store"],
    }),
    getItemInfo: build.query({
      query: (cardName) => `/store/${cardName}`,
      providesTags: ["Store"],
    }),
    postStoreInfo: build.mutation({
      query: (data) => ({
        url: "/store",
        method: "POST",
        body: data,
        invalidatesTags: ["Store"],
      }),
    }),
    getTransaction: build.query({
      query: () => "transaction",
      providesTags: ["transaction"],
    }),
    getTransactionAdmin: build.query({
      query: (id) => `transaction/${id}`,
      providesTags: ["transaction"],
    }),
    postTransaction: build.mutation({
      query: (data) => ({
        url: "/transaction",
        method: "POST",
        body: data,
        invalidatesTags: ["transaction"],
      }),
    }),
    signUpUser: build.mutation({
      query: (data) => ({
        url: "/joinGroup/signUp",
        method: "POST",
        body: data,
        invalidatesTags: ["joinGroup"],
      }),
    }),
    signInUser: build.mutation({
      query: (data) => ({
        url: "/joinGroup/signIn",
        method: "POST",
        body: data,
        invalidatesTags: ["joinGroup"],
      }),
    }),
    joinGroup: build.mutation({
      query: (data) => ({
        url: `/joinGroup/join/${data.groupId}`,
        method: "POST",
        body: { userId: data.userId },
        invalidatesTags: ["joinGroup"],
      }),
    }),
  }),
});

export const {
  useGetFormInfoQuery,
  usePostFormInfoMutation,
  useGetQuestionQuery,
  useGetCompetitionForAdminQuery,
  usePostQuestionMutation,
  usePostUserScoreMutation,
  useGetQuizTitleDescriptionQuery,
  useGetQuizDataQuery,
  useDeleteQuizMutation,
  useUpdatedQuizAttempsMutation,
  useGetGroupInfoQuery,
  useGetAdminGroupQuery,
  useGetAllGroupInfoQuery,
  useGetMembersOfGroupQuery,
  useDeleteGroupMutation,
  useDeleteMembersMutation,
  usePostAddUserToGroupUsingNumberMutation,
  usePostGroupInfoMutation,
  usePostAssignGroupMutation,
  useGetOpportunityInfoQuery,
  useGetOpportunityMembersQuery,
  useGetOpportunityUsersQuery,
  useDeleteOpportunitiesMutation,
  usePostOpportunityInfoMutation,
  usePostUserJoinOpportunityMutation,
  useGetStoreInfoQuery,
  useGetUserProductQuery,
  useGetItemInfoQuery,
  usePostStoreInfoMutation,
  useGetTransactionQuery,
  useGetTransactionAdminQuery,
  usePostTransactionMutation,
  useDeleteFormMutation,
  useUpdateFormMutation,
  useSignUpUserMutation,
  useSignInUserMutation,
  useJoinGroupMutation,
} = api;
