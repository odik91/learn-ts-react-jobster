import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { RootState } from "../../store";
// import customFetch from "../../utils/axios";
// import { errorHelperThunkAPI } from "../user/userSlice";
import { getAllJobsThunk, showStatsThunk } from "./allJobsThunk";

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

export type MonthlyApplications = {
  date: string;
  count: number;
};

export type DefaultStats = {
  pending: number;
  interview: number;
  declined: number;
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
  stats: DefaultStats | null;
  monthlyApplications: MonthlyApplications[];
}

interface StatsData {
  defaultStats: DefaultStats;
  monthlyApplications: MonthlyApplications[];
}

type HandleChangePayload<K extends keyof InitialState> = {
  name: K;
  value: InitialState[K];
};

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
  stats: null,
  monthlyApplications: [],
  ...initialFilterState,
};

// export const getAllJobs = createAsyncThunk<
//   ResponseJobData,
//   void,
//   { rejectValue: string; state: RootState }
// >("allJobs/getJobs", async (_, thunkAPI) => {
//   const { page, search, searchStatus, searchType, sort } =
//     thunkAPI.getState().allJobs;

//   let url = `/jobs?status${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;

//   if (search) {
//     url = url + `&search=${search}`;
//   }

//   try {
//     const response = await customFetch.get(url);
//     return response.data;
//   } catch (error: unknown) {
//     return errorHelperThunkAPI(error, thunkAPI, "action");
//   }
// });

export const getAllJobs = createAsyncThunk<
  ResponseJobData,
  void,
  { rejectValue: string; state: RootState }
>("allJobs/getJobs", async (_, thunkAPI) => {
  return getAllJobsThunk(thunkAPI);
});

// export const showStats = createAsyncThunk<
//   any,
//   void,
//   { rejectValue: string; state: RootState }
// >("allJobs/showStats", async (_, thunkAPI) => {
//   try {
//     const response = await customFetch.get("/jobs/stats");

//     return response.data;
//   } catch (error: unknown) {
//     return errorHelperThunkAPI(error, thunkAPI, "action");
//   }
// });

export const showStats = createAsyncThunk<
  any,
  void,
  { rejectValue: string; state: RootState }
>("allJobs/showStats", async (_, thunkAPI) => {
  return showStatsThunk(_, thunkAPI);
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
    handleChange: (
      state: any,
      { payload: { name, value } }: PayloadAction<HandleChangePayload<any>>
    ) => {
      state.page = 1;
      state[name] = value;
    },
    clearFilters: (state) => {
      return { ...state, ...initialFilterState };
    },
    changePage: (state, { payload }: PayloadAction<number>) => {
      state.page = payload;
    },
    clearAllJobsState: () => initialState,
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
          state.numOfPages = payload.numOfPages;
          state.totalJobs = payload.totalJobs;
        }
      )
      .addCase(
        getAllJobs.rejected,
        (state, { payload }: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          if (payload) toast.error(payload);
        }
      )
      .addCase(showStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        showStats.fulfilled,
        (state, { payload }: PayloadAction<StatsData>) => {
          state.isLoading = false;

          state.stats = payload.defaultStats;
          state.monthlyApplications = payload.monthlyApplications;
        }
      )
      .addCase(
        showStats.rejected,
        (state, { payload }: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          if (payload) toast.error(payload);
        }
      );
  },
});
export const {
  showLoading,
  hideLoading,
  handleChange,
  clearFilters,
  changePage,
  clearAllJobsState,
} = allJobsSlice.actions;
export default allJobsSlice.reducer;
