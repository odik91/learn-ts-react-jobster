import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { RootState } from "../../store";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/localStorage";
import { loginUserThunk, registerUserThunk, updateUserThunk } from "./userThunk";

export type UserType = {
  email: string;
  lastName?: string;
  location?: string;
  name: string;
  token?: string;
};

export type LoginUser = {
  email: string;
  password: string;
};

type RegisterUser = LoginUser & {
  name: string;
};

export interface ThunkAPI {
  rejectWithValue: (value: string) => void;
  dispatch: Function;
}

type ReturnUserData = {
  user: UserType;
};

type InitialStateSlice = {
  isLoading: boolean;
  isSidebarOpen: boolean;
  user: UserType | null;
};

const initialState: InitialStateSlice = {
  isLoading: false,
  isSidebarOpen: false,
  user: getUserFromLocalStorage(),
};

export const errorHelperThunkAPI = (
  error: unknown,
  thunkAPI: ThunkAPI,
  actType: "auth" | "action"
) => {
  if (axios.isAxiosError(error)) {
    if (actType === "action") {
      if (error.response?.status === 401) {
        thunkAPI.dispatch(logoutUser());
        return thunkAPI.rejectWithValue("Unauthorized! Logging Out...");
      }
    }

    return thunkAPI.rejectWithValue(
      error.response?.data?.msg || "An error occurred"
    );
  } else if (error instanceof Error) {
    return thunkAPI.rejectWithValue(error.message);
  } else {
    return thunkAPI.rejectWithValue("Unknown error occurred");
  }
};

export const registerUser = createAsyncThunk<
  ReturnUserData, // Tipe untuk hasil sukses
  RegisterUser,
  { rejectValue: string }
>("user/registerUser", async (user: RegisterUser, thunkAPI): Promise<any> => {
  return registerUserThunk("/auth/register", user, thunkAPI)
});

export const loginUser = createAsyncThunk<
  ReturnUserData,
  LoginUser,
  { rejectValue: string; state: RootState }
>(
  "user/loginUser",
  async (user: LoginUser, thunkAPI: ThunkAPI): Promise<any> => {
    return loginUserThunk("/auth/login", user, thunkAPI);
  }
);

export const updateUser = createAsyncThunk<
  ReturnUserData,
  UserType,
  { rejectValue: string; state: RootState }
>("user/updateUser", async (user: UserType, thunkAPI: any): Promise<any> => {
  return updateUserThunk("/auth/updateUser", user, thunkAPI);
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.isSidebarOpen = false;
      removeUserFromLocalStorage();
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        registerUser.fulfilled,
        (state, { payload }: PayloadAction<ReturnUserData>) => {
          const { user } = payload;
          state.isLoading = false;
          state.user = user;
          addUserToLocalStorage(user);
          toast.success(`Hello There ${user.name}`);
        }
      )
      .addCase(
        registerUser.rejected,
        (state, { payload }: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          if (payload) toast.error(payload);
        }
      )
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        loginUser.fulfilled,
        (state, { payload }: PayloadAction<ReturnUserData>) => {
          const { user } = payload;
          state.isLoading = false;
          state.user = user;
          addUserToLocalStorage(user);
          toast.success(`Welcome back ${user.name}`);
        }
      )
      .addCase(
        loginUser.rejected,
        (state, { payload }: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          if (payload) toast.error(payload);
        }
      )
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        updateUser.fulfilled,
        (state, { payload }: PayloadAction<ReturnUserData>) => {
          const { user } = payload;
          state.isLoading = false;
          state.user = user;

          addUserToLocalStorage(user);
          toast.success("User updated");
        }
      )
      .addCase(
        updateUser.rejected,
        (state, { payload }: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          if (payload) toast.error(payload);
        }
      );
  },
});

export const { logoutUser, toggleSidebar } = userSlice.actions;
export default userSlice.reducer;
