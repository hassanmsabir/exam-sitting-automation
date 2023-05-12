import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Settings from "../../config/Settings";

export const getAllExamSchedules = createAsyncThunk(
  "ListAllExamSchedules/examSchedule",
  async (values, { dispatch, getState }) => {
    dispatch(gettingExamSchedulesList());
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(Settings.apiUrl + "list-all-seating-arrangement", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        dispatch(gettingExamSchedulesListSuccess(result));
      })
      .catch((error) => {
        dispatch(gettingExamSchedulesListFailed(error));
      });
  }
);

const listExamScheduleSlice = createSlice({
  name: "ListAllExamSchedules",
  initialState: {
    ExamSchedulesListing: null,
    ExamSchedulesListingLoading: false,
    ExamSchedulesListingFailed: false,
    ExamSchedulesListingSuccess: false,
    ExamSchedulesListingErrorMessage: null,
    status: "idle",
  },
  reducers: {
    gettingExamSchedulesList: (state, action) => {
      state.ExamSchedulesListing = null;
      state.ExamSchedulesListingLoading = true;
      state.ExamSchedulesListingSuccess = false;
      state.ExamSchedulesListingFailed = false;
      state.ExamSchedulesListingErrorMessage = null;
      state.status = "loading";
    },
    gettingExamSchedulesListSuccess: (state, action) => {
      state.ExamSchedulesListing = action.payload;
      state.ExamSchedulesListingLoading = false;
      state.ExamSchedulesListingSuccess = true;
      state.ExamSchedulesListingFailed = false;
      state.ExamSchedulesListingErrorMessage = null;
      state.status = "success";
    },
    gettingExamSchedulesListFailed: (state, action) => {
      state.ExamSchedulesListing = null;
      state.ExamSchedulesListingLoading = false;
      state.ExamSchedulesListingSuccess = false;
      state.ExamSchedulesListingFailed = true;
      state.ExamSchedulesListingErrorMessage = action.payload;
      state.status = "failed";
    },
  },
});
export const {
  gettingExamSchedulesList,
  gettingExamSchedulesListSuccess,
  gettingExamSchedulesListFailed,
} = listExamScheduleSlice.actions;

export default listExamScheduleSlice.reducer;
