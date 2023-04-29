import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Settings from "../../config/Settings";

export const loginUserAPI = createAsyncThunk(
  "loginUser/authenticate",
  async (values, { dispatch, getState }) => {
    dispatch(loggingInUser());

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: values.username,
      password: values.password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(Settings.apiUrl + "login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result?.token) {
          dispatch(loggingInUserSuccess(result));
        } else {
          dispatch(loggingInUserFailed(result?.message));
        }
      })
      .catch((error) => dispatch(loggingInUserFailed(error)));
  }
);
export const loginUserResetData = createAsyncThunk(
  "loginUserResetData/authenticate",
  async (values, { dispatch, getState }) => {
    dispatch(loggingInUserReset());
  }
);
const loginUserSlice = createSlice({
  name: "loginUser",
  initialState: {
    LoginUserData: null,
    LoginUserDataLoading: false,
    LoginUserDataFailed: false,
    LoginUserDataSuccess: false,
    LoginUserDataErrorMessage: null,
    status: "idle",
  },
  reducers: {
    loggingInUser: (state, action) => {
      state.LoginUserData = null;
      state.LoginUserDataLoading = true;
      state.LoginUserDataSuccess = false;
      state.LoginUserDataFailed = false;
      state.LoginUserDataErrorMessage = null;
      state.status = "loading";
    },
    loggingInUserSuccess: (state, action) => {
      state.LoginUserData = action.payload;
      state.LoginUserDataLoading = false;
      state.LoginUserDataSuccess = true;
      state.LoginUserDataFailed = false;
      state.LoginUserDataErrorMessage = null;
      state.status = "success";
    },
    loggingInUserFailed: (state, action) => {
      state.LoginUserData = null;
      state.LoginUserDataLoading = false;
      state.LoginUserDataSuccess = false;
      state.LoginUserDataFailed = true;
      state.LoginUserDataErrorMessage = action.payload;
      state.status = "failed";
    },
    loggingInUserReset: (state, action) => {
      state.LoginUserData = null;
      state.LoginUserDataLoading = false;
      state.LoginUserDataSuccess = false;
      state.LoginUserDataFailed = false;
      state.LoginUserDataErrorMessage = null;
      state.status = "idle";
    },
  },
});
export const {
  loggingInUser,
  loggingInUserSuccess,
  loggingInUserFailed,
  loggingInUserReset,
} = loginUserSlice.actions;

export default loginUserSlice.reducer;
