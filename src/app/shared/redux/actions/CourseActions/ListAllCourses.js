import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Settings from "../../config/Settings";

export const getAllCoursesAPI = createAsyncThunk(
  "ListAllCourses/course",
  async (values, { dispatch, getState }) => {
    dispatch(gettingCourseList());
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(Settings.apiUrl + "listAllCourses", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        dispatch(gettingCourseListSuccess(result));
      })
      .catch((error) => {
        dispatch(gettingCourseListFailed(error));
      });
  }
);

const listCourseSlice = createSlice({
  name: "ListAllCourses",
  initialState: {
    CourseListing: null,
    CourseListingLoading: false,
    CourseListingFailed: false,
    CourseListingSuccess: false,
    CourseListingErrorMessage: null,
    status: "idle",
  },
  reducers: {
    gettingCourseList: (state, action) => {
      state.CourseListing = null;
      state.CourseListingLoading = true;
      state.CourseListingSuccess = false;
      state.CourseListingFailed = false;
      state.CourseListingErrorMessage = null;
      state.status = "loading";
    },
    gettingCourseListSuccess: (state, action) => {
      state.CourseListing = action.payload;
      state.CourseListingLoading = false;
      state.CourseListingSuccess = true;
      state.CourseListingFailed = false;
      state.CourseListingErrorMessage = null;
      state.status = "success";
    },
    gettingCourseListFailed: (state, action) => {
      state.CourseListing = null;
      state.CourseListingLoading = false;
      state.CourseListingSuccess = false;
      state.CourseListingFailed = true;
      state.CourseListingErrorMessage = action.payload;
      state.status = "failed";
    },
  },
});
export const {
  gettingCourseList,
  gettingCourseListSuccess,
  gettingCourseListFailed,
} = listCourseSlice.actions;

export default listCourseSlice.reducer;
