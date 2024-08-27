import customFetch from "../../utils/axios";
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
