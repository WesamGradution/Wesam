// Import createSlice and createApi from redux-toolkit
import { createSlice, createApi,createAsyncThunk  } from '@reduxjs/toolkit';
import {api} from "./api"






// create a slice of state and reducers for your user data
export const userSlice = createSlice({
  name: "user", // give a name to your slice
  initialState: {
    // define the initial state of your slice
    user: null, // store the user information
    status: "idle", // store the status of the async actions
    error: null, // store any errors
  },
  reducers: {
    // add extra reducers to handle other actions
    logOutUser: (state) => {
      // reset the state when logging out
      state.user = null;
      state.status = "idle";
      state.error = null;
    },
    updateUser: (state, action) => {
      // update the user information with the payload
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    // handle the async actions created by redux query toolkit using builder syntax
    builder.addMatcher(api.endpoints.signUpUser.matchPending, (state) => {
      // set the status to loading when signing up
      state.status = "loading";
      state.error = null;
    });
    builder.addMatcher(api.endpoints.signUpUser.matchFulfilled, (state, action) => {
      // set the status to success and store the user information when signed up
      state.status = "success";
      state.user = action.payload;
    });
    builder.addMatcher(api.endpoints.signUpUser.matchRejected, (state, action) => {
      // set the status to failed and store the error when signing up fails
      state.status = "failed";
      state.error = action.payload;
    });
    builder.addMatcher(api.endpoints.signInUser.matchPending, (state) => {
      // set the status to loading when signing in
      state.status = "loading";
      state.error = null;
    });
    builder.addMatcher(api.endpoints.signInUser.matchFulfilled, (state, action) => {
      // set the status to success and store the user information when signed in
      state.status = "success";
      state.user = action.payload;
    });
    builder.addMatcher(api.endpoints.signInUser.matchRejected, (state, action) => {
      // set the status to failed and store the error when signing in fails
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

// export the actions and selectors from your slice
export const { logOutUser, updateUser } = userSlice.actions; // export the extra actions
export const selectUser = (state) => state.user.user; // export a selector to get the user information from the state
export default userSlice.reducer; // export the reducer as default
