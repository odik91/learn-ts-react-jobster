import customFetch from "../../utils/axios";
import { getAllJobs, hideLoading, showLoading } from "../allJobs/allJobsSlice";
import { errorHelperThunkAPI } from "../user/userSlice";
import { AppThunkAPI } from "../user/userThunk";
import { clearValues, Job, JobReturn } from "./jobSlice";

// const authHeader = (thunkAPI: AppThunkAPI) => {
//   const token = thunkAPI.getState().user.user?.token;
//   return {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   }
// }

export const createJobThunk = async (
  url: string,
  job: Job,
  thunkAPI: AppThunkAPI
): Promise<JobReturn | unknown> => {
  try {
    const response = await customFetch.post(url, job);
    thunkAPI.dispatch(clearValues());
    return response.data;
  } catch (error: unknown) {
    return errorHelperThunkAPI(error, thunkAPI, "action");
  }
};

export const deleteJobThunk = async (
  url: string,
  jobId: string,
  thunkAPI: AppThunkAPI
) => {
  thunkAPI.dispatch(showLoading());
  try {
    const response = await customFetch.delete(url + jobId);
    thunkAPI.dispatch(getAllJobs());

    return response.data?.msg;
  } catch (error: unknown) {
    thunkAPI.dispatch(hideLoading());
    return errorHelperThunkAPI(error, thunkAPI, "action");
  }
};

export const editJobThunk = async (
  url: string,
  { jobId, job }: { jobId: string; job: Job },
  thunkAPI: AppThunkAPI
) => {
  try {
    const response = await customFetch.patch(url + jobId, job);
    thunkAPI.dispatch(clearValues());
    return response.data;
  } catch (error: unknown) {
    return errorHelperThunkAPI(error, thunkAPI, "action");
  }
};
