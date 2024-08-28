import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { RootState } from "../../store";
import customFetch from "../../utils/axios";
import { errorHelperThunkAPI } from "../user/userSlice";

type Sort = "latest" | "oldest" | "a-z" | "z-a";

export type JobData = {
  _id: string;
  company: string;
  position: string;
  status: string;
  createdBy: string;
  jobType: string;
  jobLocation: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type ResponseJobData = {
  jobs: JobData[];
  totalJobs: number;
  numOfPages: number;
};

interface InitialFilterState {
  search: string;
  searchStatus: string;
  searchType: string;
  sort: Sort;
  sortOptions: Sort[];
}

interface InitialState extends InitialFilterState {
  isLoading: boolean;
  jobs: JobData[];
  totalJobs: number;
  numOfPages: number;
  page: number;
  stats: {};
  monthlyApplications: [];
}

const initialFilterState: InitialFilterState = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const initialState: InitialState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFilterState,
};

export const getAllJobs = createAsyncThunk<
  ResponseJobData,
  void,
  { rejectValue: string; state: RootState }
>("allJobs/getJobs", async (_, thunkAPI) => {
  let url = `/jobs`;
  try {
    const response = await customFetch.get(url);
    return response.data;
  } catch (error: unknown) {
    return errorHelperThunkAPI(error, thunkAPI, "action");
  }
});

const allJobsSlice = createSlice({
  name: "allJobs",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getAllJobs.fulfilled,
        (state, { payload }: PayloadAction<ResponseJobData>) => {
          state.isLoading = false;

          state.jobs = payload.jobs;
        }
      )
      .addCase(
        getAllJobs.rejected,
        (state, { payload }: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          if (payload) toast.error(payload);
        }
      );
  },
});
export const { showLoading, hideLoading } = allJobsSlice.actions;
export default allJobsSlice.reducer;
