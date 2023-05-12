import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Settings from "../../config/Settings";

export const getAllExamHalls = createAsyncThunk(
  "ListAllExamHalls/examhall",
  async (values, { dispatch, getState }) => {
    dispatch(gettingExamHallsList());
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(Settings.apiUrl + "list_all_exam_hall", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        dispatch(gettingExamHallsListSuccess(result));
      })
      .catch((error) => {
        dispatch(gettingExamHallsListFailed(error));
      });
  }
);

const listExamHallsSlice = createSlice({
  name: "ListAllExamHalls",
  initialState: {
    ExamHallsListing: null,
    ExamHallsListingLoading: false,
    ExamHallsListingFailed: false,
    ExamHallsListingSuccess: false,
    ExamHallsListingErrorMessage: null,
    status: "idle",
  },
  reducers: {
    gettingExamHallsList: (state, action) => {
      state.ExamHallsListing = null;
      state.ExamHallsListingLoading = true;
      state.ExamHallsListingSuccess = false;
      state.ExamHallsListingFailed = false;
      state.ExamHallsListingErrorMessage = null;
      state.status = "loading";
    },
    gettingExamHallsListSuccess: (state, action) => {
      state.ExamHallsListing = action.payload;
      state.ExamHallsListingLoading = false;
      state.ExamHallsListingSuccess = true;
      state.ExamHallsListingFailed = false;
      state.ExamHallsListingErrorMessage = null;
      state.status = "success";
    },
    gettingExamHallsListFailed: (state, action) => {
      state.ExamHallsListing = null;
      state.ExamHallsListingLoading = false;
      state.ExamHallsListingSuccess = false;
      state.ExamHallsListingFailed = true;
      state.ExamHallsListingErrorMessage = action.payload;
      state.status = "failed";
    },
  },
});
export const {
  gettingExamHallsList,
  gettingExamHallsListSuccess,
  gettingExamHallsListFailed,
} = listExamHallsSlice.actions;

export default listExamHallsSlice.reducer;
