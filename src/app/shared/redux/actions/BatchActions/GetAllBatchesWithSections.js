import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Settings from "../../config/Settings";

export const getAllBatchesWithSectionsAPI = createAsyncThunk(
  "ListAllBatchesWithSections/batch",
  async (values, { dispatch, getState }) => {
    dispatch(gettingBatchesWithSectionsList());
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(Settings.apiUrl + "listAllBatchesWithSection", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        dispatch(gettingBatchesWithSectionsListSuccess(result));
      })
      .catch((error) => {
        dispatch(gettingBatchesWithSectionsListFailed(error));
      });
  }
);

const listBatchWithSectionsSlice = createSlice({
  name: "ListAllBatchesWithSections",
  initialState: {
    BatchesWithSectionsListing: null,
    BatchesWithSectionsListingLoading: false,
    BatchesWithSectionsListingFailed: false,
    BatchesWithSectionsListingSuccess: false,
    BatchesWithSectionsListingErrorMessage: null,
    status: "idle",
  },
  reducers: {
    gettingBatchesWithSectionsList: (state, action) => {
      state.BatchesWithSectionsListing = null;
      state.BatchesWithSectionsListingLoading = true;
      state.BatchesWithSectionsListingSuccess = false;
      state.BatchesWithSectionsListingFailed = false;
      state.BatchesWithSectionsListingErrorMessage = null;
      state.status = "loading";
    },
    gettingBatchesWithSectionsListSuccess: (state, action) => {
      state.BatchesWithSectionsListing = action.payload;
      state.BatchesWithSectionsListingLoading = false;
      state.BatchesWithSectionsListingSuccess = true;
      state.BatchesWithSectionsListingFailed = false;
      state.BatchesWithSectionsListingErrorMessage = null;
      state.status = "success";
    },
    gettingBatchesWithSectionsListFailed: (state, action) => {
      state.BatchesWithSectionsListing = null;
      state.BatchesWithSectionsListingLoading = false;
      state.BatchesWithSectionsListingSuccess = false;
      state.BatchesWithSectionsListingFailed = true;
      state.BatchesWithSectionsListingErrorMessage = action.payload;
      state.status = "failed";
    },
  },
});
export const {
  gettingBatchesWithSectionsList,
  gettingBatchesWithSectionsListSuccess,
  gettingBatchesWithSectionsListFailed,
} = listBatchWithSectionsSlice.actions;

export default listBatchWithSectionsSlice.reducer;
