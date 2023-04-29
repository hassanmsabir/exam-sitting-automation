import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Settings from "../../config/Settings";

export const getAllTeachersAPI = createAsyncThunk(
  "ListAllTeachers/teacher",
  async (values, { dispatch, getState }) => {
    dispatch(gettingTeacherList());
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(Settings.apiUrl + "listTeachers", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        dispatch(gettingTeacherListSuccess(result));
      })
      .catch((error) => {
        dispatch(gettingTeacherListFailed(error));
      });
  }
);

const listTeacherSlice = createSlice({
  name: "ListAllTeachers",
  initialState: {
    TeacherListing: null,
    TeacherListingLoading: false,
    TeacherListingFailed: false,
    TeacherListingSuccess: false,
    TeacherListingErrorMessage: null,
    status: "idle",
  },
  reducers: {
    gettingTeacherList: (state, action) => {
      state.TeacherListing = null;
      state.TeacherListingLoading = true;
      state.TeacherListingSuccess = false;
      state.TeacherListingFailed = false;
      state.TeacherListingErrorMessage = null;
      state.status = "loading";
    },
    gettingTeacherListSuccess: (state, action) => {
      state.TeacherListing = action.payload;
      state.TeacherListingLoading = false;
      state.TeacherListingSuccess = true;
      state.TeacherListingFailed = false;
      state.TeacherListingErrorMessage = null;
      state.status = "success";
    },
    gettingTeacherListFailed: (state, action) => {
      state.TeacherListing = null;
      state.TeacherListingLoading = false;
      state.TeacherListingSuccess = false;
      state.TeacherListingFailed = true;
      state.TeacherListingErrorMessage = action.payload;
      state.status = "failed";
    },
  },
});
export const {
  gettingTeacherList,
  gettingTeacherListSuccess,
  gettingTeacherListFailed,
} = listTeacherSlice.actions;

export default listTeacherSlice.reducer;
