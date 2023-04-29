import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getMyUserAPI = createAsyncThunk(
  "ListAllUsers/user",
  async (values, { dispatch, getState }) => {
    dispatch(gettingUserList());
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("https://jsonplaceholder.typicode.com/users", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        dispatch(gettingUserListSuccess(result));
      })
      .catch((error) => dispatch(gettingUserListFailed(error)));
  }
);

const listUsersSlice = createSlice({
  name: "ListAllUsers",
  initialState: {
    UserListing: null,
    UserListingLoading: false,
    UserListingFailed: false,
    UserListingSuccess: false,
    UserListingErrorMessage: null,
    status: "idle",
  },
  reducers: {
    gettingUserList: (state, action) => {
      state.UserListing = null;
      state.UserListingLoading = true;
      state.UserListingSuccess = false;
      state.UserListingFailed = false;
      state.UserListingErrorMessage = null;
      state.status = "loading";
    },
    gettingUserListSuccess: (state, action) => {
      state.UserListing = action.payload;
      state.UserListingLoading = false;
      state.UserListingSuccess = true;
      state.UserListingFailed = false;
      state.UserListingErrorMessage = null;
      state.status = "success";
    },
    gettingUserListFailed: (state, action) => {
      state.UserListing = null;
      state.UserListingLoading = false;
      state.UserListingSuccess = false;
      state.UserListingFailed = true;
      state.UserListingErrorMessage = action.payload;
      state.status = "failed";
    },
  },
});
export const {
  gettingUserList,
  gettingUserListSuccess,
  gettingUserListFailed,
} = listUsersSlice.actions;

export default listUsersSlice.reducer;
