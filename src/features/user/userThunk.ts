import { RootState } from "../../store";
import customFetch from "../../utils/axios";
import {
  errorHelperThunkAPI,
  LoginUser,
  ThunkAPI,
  UserType,
} from "./userSlice";

export interface AppThunkAPI extends ThunkAPI {
  getState: () => RootState;
}

export const registerUserThunk = async (
  url: string,
  user: UserType,
  thunkAPI: ThunkAPI
): Promise<UserType | unknown> => {
  try {
    const response = await customFetch.post(url, user);
    return response.data;
  } catch (error: unknown) {
    return errorHelperThunkAPI(error, thunkAPI, "auth");
  }
};

export const loginUserThunk = async (
  url: string,
  user: LoginUser,
  thunkAPI: ThunkAPI
): Promise<UserType | unknown> => {
  try {
    const response = await customFetch.post(url, user);
    return response.data;
  } catch (error: unknown) {
    return errorHelperThunkAPI(error, thunkAPI, "auth");
  }
};

export const updateUserThunk = async (
  url: string,
  user: UserType,
  thunkAPI: AppThunkAPI
): Promise<UserType | unknown> => {
  try {
    const response = await customFetch.patch(url, user);
    return response.data;
  } catch (error: unknown) {
    return errorHelperThunkAPI(error, thunkAPI, "action");
  }
};
