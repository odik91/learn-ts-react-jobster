import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import jobSlice from "./features/job/jobSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    job: jobSlice,
  },
});

// Menambahkan tipe RootState untuk digunakan pada useSelector
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
