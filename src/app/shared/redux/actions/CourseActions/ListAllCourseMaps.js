import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Settings from "../../config/Settings";

export const getAllCourseMapsAPI = createAsyncThunk(
  "ListAllCourseMaps/course",
  async (values, { dispatch, getState }) => {
    dispatch(gettingCourseMapList());
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(Settings.apiUrl + "listAllCourseMaps", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        dispatch(gettingCourseMapListSuccess(result));
      })
      .catch((error) => {
        dispatch(gettingCourseMapListFailed(error));
      });
  }
);

const listCourseMapSlice = createSlice({
  name: "ListAllCourseMaps",
  initialState: {
    CourseMapListing: null,
    CourseMapListingLoading: false,
    CourseMapListingFailed: false,
    CourseMapListingSuccess: false,
    CourseMapListingErrorMessage: null,
    status: "idle",
  },
  reducers: {
    gettingCourseMapList: (state, action) => {
      state.CourseMapListing = null;
      state.CourseMapListingLoading = true;
      state.CourseMapListingSuccess = false;
      state.CourseMapListingFailed = false;
      state.CourseMapListingErrorMessage = null;
      state.status = "loading";
    },
    gettingCourseMapListSuccess: (state, action) => {
      state.CourseMapListing = action.payload;
      state.CourseMapListingLoading = false;
      state.CourseMapListingSuccess = true;
      state.CourseMapListingFailed = false;
      state.CourseMapListingErrorMessage = null;
      state.status = "success";
    },
    gettingCourseMapListFailed: (state, action) => {
      state.CourseMapListing = null;
      state.CourseMapListingLoading = false;
      state.CourseMapListingSuccess = false;
      state.CourseMapListingFailed = true;
      state.CourseMapListingErrorMessage = action.payload;
      state.status = "failed";
    },
  },
});
export const {
  gettingCourseMapList,
  gettingCourseMapListSuccess,
  gettingCourseMapListFailed,
} = listCourseMapSlice.actions;

export default listCourseMapSlice.reducer;
