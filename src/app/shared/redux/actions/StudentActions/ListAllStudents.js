import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Settings from "../../config/Settings";

export const getAllStudentsAPI = createAsyncThunk(
  "ListAllStudents/student",
  async (values, { dispatch, getState }) => {
    dispatch(gettingStudentsList());
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(Settings.apiUrl + "listAllStudents", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        dispatch(gettingStudentsListSuccess(result));
      })
      .catch((error) => {
        dispatch(gettingStudentsListFailed(error));
      });
  }
);

const listCourseSlice = createSlice({
  name: "ListAllStudents",
  initialState: {
    StudentsListing: null,
    StudentsListingLoading: false,
    StudentsListingFailed: false,
    StudentsListingSuccess: false,
    StudentsListingErrorMessage: null,
    status: "idle",
  },
  reducers: {
    gettingStudentsList: (state, action) => {
      state.StudentsListing = null;
      state.StudentsListingLoading = true;
      state.StudentsListingSuccess = false;
      state.StudentsListingFailed = false;
      state.StudentsListingErrorMessage = null;
      state.status = "loading";
    },
    gettingStudentsListSuccess: (state, action) => {
      state.StudentsListing = action.payload;
      state.StudentsListingLoading = false;
      state.StudentsListingSuccess = true;
      state.StudentsListingFailed = false;
      state.StudentsListingErrorMessage = null;
      state.status = "success";
    },
    gettingStudentsListFailed: (state, action) => {
      state.StudentsListing = null;
      state.StudentsListingLoading = false;
      state.StudentsListingSuccess = false;
      state.StudentsListingFailed = true;
      state.StudentsListingErrorMessage = action.payload;
      state.status = "failed";
    },
  },
});
export const {
  gettingStudentsList,
  gettingStudentsListSuccess,
  gettingStudentsListFailed,
} = listCourseSlice.actions;

export default listCourseSlice.reducer;
