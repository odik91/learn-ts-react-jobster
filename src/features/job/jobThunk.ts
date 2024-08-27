import customFetch from "../../utils/axios";
import { getAllJobs, hideLoading, showLoading } from "../allJobs/allJobsSlice";
import { errorHelperThunkAPI } from "../user/userSlice";
import { AppThunkAPI } from "../user/userThunk";
import { Job, JobReturn } from "./jobSlice";

export const createJobThunk = async (
  url: string,
  job: Job,
  thunkAPI: AppThunkAPI
): Promise<JobReturn | unknown> => {
  try {
    const token = thunkAPI.getState().user.user?.token;
    const response = await customFetch.post(url, job, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
  const token = thunkAPI.getState().user.user?.token;

  try {
    const response = await customFetch.delete(url + jobId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    thunkAPI.dispatch(getAllJobs());
    
    return response.data?.msg;
  } catch (error: unknown) {
    thunkAPI.dispatch(hideLoading());
    return errorHelperThunkAPI(error, thunkAPI, "action");
  }
};
