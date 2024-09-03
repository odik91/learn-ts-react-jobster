import customFetch from "../../utils/axios";
import { errorHelperThunkAPI } from "../user/userSlice";
import { AppThunkAPI } from "../user/userThunk";

export const getAllJobsThunk = async (thunkAPI: AppThunkAPI) => {
  const { page, search, searchStatus, searchType, sort } =
    thunkAPI.getState().allJobs;

  let url = `/jobs?status${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;

  if (search) {
    url = url + `&search=${search}`;
  }

  try {
    const response = await customFetch.get(url);
    return response.data;
  } catch (error: unknown) {
    return errorHelperThunkAPI(error, thunkAPI, "action");
  }
};

export const showStatsThunk = async (_: void, thunkAPI: AppThunkAPI) => {
  try {
    const response = await customFetch.get("/jobs/stats");

    return response.data;
  } catch (error: unknown) {
    return errorHelperThunkAPI(error, thunkAPI, "action");
  }
};
