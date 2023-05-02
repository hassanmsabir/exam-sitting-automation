import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Settings from "../../config/Settings";

export const getAllBatchesAPI = createAsyncThunk(
  "ListAllBatches/batch",
  async (values, { dispatch, getState }) => {
    dispatch(gettingBatchesList());
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(Settings.apiUrl + "listAllBatches", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        dispatch(gettingBatchesListSuccess(result));
      })
      .catch((error) => {
        dispatch(gettingBatchesListFailed(error));
      });
  }
);

const listBatchesSlice = createSlice({
  name: "ListAllBatches",
  initialState: {
    BatchesListing: null,
    BatchesListingLoading: false,
    BatchesListingFailed: false,
    BatchesListingSuccess: false,
    BatchesListingErrorMessage: null,
    status: "idle",
  },
  reducers: {
    gettingBatchesList: (state, action) => {
      state.BatchesListing = null;
      state.BatchesListingLoading = true;
      state.BatchesListingSuccess = false;
      state.BatchesListingFailed = false;
      state.BatchesListingErrorMessage = null;
      state.status = "loading";
    },
    gettingBatchesListSuccess: (state, action) => {
      state.BatchesListing = action.payload;
      state.BatchesListingLoading = false;
      state.BatchesListingSuccess = true;
      state.BatchesListingFailed = false;
      state.BatchesListingErrorMessage = null;
      state.status = "success";
    },
    gettingBatchesListFailed: (state, action) => {
      state.BatchesListing = null;
      state.BatchesListingLoading = false;
      state.BatchesListingSuccess = false;
      state.BatchesListingFailed = true;
      state.BatchesListingErrorMessage = action.payload;
      state.status = "failed";
    },
  },
});
export const {
  gettingBatchesList,
  gettingBatchesListSuccess,
  gettingBatchesListFailed,
} = listBatchesSlice.actions;

export default listBatchesSlice.reducer;
