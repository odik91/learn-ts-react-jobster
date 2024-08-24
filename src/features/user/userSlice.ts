import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import customFetch from "../../utils/axios";
import { toast } from "react-toastify";
import axios from "axios";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/localStorage";
import { RootState } from "../../store";

export type UserType = {
  email: string;
  lastName?: string;
  location?: string;
  name: string;
  token?: string;
};

type LoginUser = {
  email: string;
  password: string;
};

type RegisterUser = LoginUser & {
  name: string;
};

interface ThunkAPI {
  rejectWithValue: (value: string) => void;
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

const errorHelperThunkAPI = (error: unknown, thunkAPI: ThunkAPI) => {
  if (axios.isAxiosError(error)) {
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
>("user/registerUser", async (user: RegisterUser, thunkAPI) => {
  try {
    const response = await customFetch.post("/auth/register", user);
    return response.data;
  } catch (error: unknown) {
    return errorHelperThunkAPI(error, thunkAPI);
  }
});

export const loginUser = createAsyncThunk<
  ReturnUserData,
  LoginUser,
  { rejectValue: string }
>("user/loginUser", async (user: LoginUser, thunkAPI) => {
  try {
    const response = await customFetch.post("/auth/login", user);
    return response.data;
  } catch (error: unknown) {
    return errorHelperThunkAPI(error, thunkAPI);
  }
});

export const updateUser = createAsyncThunk<
  ReturnUserData,
  UserType,
  { rejectValue: string; state: RootState }
>("user/updateUser", async (user, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const token = state.user.user?.token;
    const response = await customFetch.patch("/auth/updateUser", user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: unknown) {
    return errorHelperThunkAPI(error, thunkAPI);
  }
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
