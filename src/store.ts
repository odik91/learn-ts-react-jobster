import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import jobSlice from "./features/job/jobSlice";
import allJobsSlice from "./features/allJobs/allJobsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    job: jobSlice,
    allJobs: allJobsSlice
  },
});

// Menambahkan tipe RootState untuk digunakan pada useSelector
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
