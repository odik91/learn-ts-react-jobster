import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { RootState } from "../../store";
import { getUserFromLocalStorage } from "../../utils/localStorage";
import { createJobThunk, deleteJobThunk } from "./jobThunk";

type JobTypeOptions = "full-time" | "part-time" | "remote" | "internship";
type StatusOptions = "interview" | "declined" | "pending";

export type Job = {
  position: string;
  company: string;
  jobLocation: string;
  jobType: JobTypeOptions;
  status: StatusOptions;
};

export type InitialState = Job & {
  isLoading: boolean;
  jobTypeOptions: JobTypeOptions[];
  statusOptions: StatusOptions[];
  isEditing: boolean;
  editJobId: string;
};

export type JobReturn = Job & {
  createdBy: string;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

const initialState: InitialState = {
  isLoading: false,
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  isEditing: false,
  editJobId: "",
};

export type HandleChangePayload<K extends keyof InitialState> = {
  name: K;
  value: InitialState[K];
};

export const createJob = createAsyncThunk<
  JobReturn,
  Job,
  { rejectValue: string; state: RootState }
>("job/createJob", async (job: Job, thunkAPI: any): Promise<any> => {
  return createJobThunk("/jobs", job, thunkAPI);
});

export const deleteJob = createAsyncThunk<
  string,
  string,
  { rejectValue: string; state: RootState }
>("job/deleteJob", async (jobId, thunkAPI) => {
  return deleteJobThunk("/jobs/", jobId, thunkAPI);
});

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    handleChange: <K extends keyof InitialState>(
      state: InitialState,
      action: PayloadAction<HandleChangePayload<K>>
    ) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
    clearValues: (): InitialState => {
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage()?.location || "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        createJob.fulfilled,
        (state, { payload }: PayloadAction<JobReturn>) => {
          state.isLoading = false;
          console.log(payload.status);

          toast.success("Job created");
        }
      )
      .addCase(
        createJob.rejected,
        (state, { payload }: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          if (payload) toast.error(payload);
        }
      )
      .addCase(deleteJob.fulfilled, (_, { payload }: PayloadAction<string>) => {
        toast.success(payload || "Job deleted successfully");
      })
      .addCase(
        deleteJob.rejected,
        (_, { payload }: PayloadAction<string | undefined>) => {
          toast.error(payload);
        }
      );
  },
});

export const { handleChange, clearValues } = jobSlice.actions;

export default jobSlice.reducer;
