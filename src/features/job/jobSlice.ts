import { createSlice } from "@reduxjs/toolkit";

type JobTypeOptions = "full-time" | "part-time" | "remote" | "internship";

type StatusOptions = "interview" | "declined" | "pending";

type InitialState = {
  isLoading: boolean;
  position: string;
  company: string;
  jobLocation: string;
  jobTypeOptions: JobTypeOptions[];
  jobType: JobTypeOptions;
  statusOptions: StatusOptions[];
  status: StatusOptions;
  isEditing: boolean;
  editJobId: string;
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

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {},
});

export default jobSlice.reducer;
