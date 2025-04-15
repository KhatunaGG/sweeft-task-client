import { create } from "zustand";
import { axiosInstance } from "../libs/axiosInstance";
import { useAuthStore } from "./sign-in.store";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { ErrorResponse, IFile, IUser, IUtilities } from "../interface";

const handleApiError = (error: AxiosError<ErrorResponse>): string => {
  if (axios.isAxiosError(error)) {
    const errorMessage = error.response?.data.message || "An error occurred";
    toast.error(errorMessage);
    return errorMessage;
  }
  const unexpectedError = "An unexpected error occurred";
  toast.error(unexpectedError);
  return unexpectedError;
};

export const useUtilities = create<IUtilities>((set, get) => ({
  allUsers: [],
  usersLength: 0,
  allFiles: [],
  filesLength: 0,
  usersPage: 1,
  usersTake: 5,
  filesPage: 1,
  filesTake: 5,
  axiosError: null,

  setAxiosError: (axiosError) => set({ axiosError }),
  setUsersPage: (page) => set({ usersPage: page }),
  setUsersTake: (take) => set({ usersTake: take }),
  setFilesPage: (page) => set({ filesPage: page }),
  setFilesTake: (take) => set({ filesTake: take }),
  setAllUsers: (allUsers: IUser[]) => {
    set({
      allUsers,
      usersLength: allUsers.length,
    });
  },
  setAllFiles: (allFiles: IFile[]) => {
    set({
      allFiles,
      filesLength: allFiles.length,
    });
  },
  setFilesLength: (length: number) => {
    set({ filesLength: length });
  },
  getAllUsers: async () => {
    const { usersPage, usersTake } = get();
    try {
      const accessToken = useAuthStore.getState().accessToken;
      if (!accessToken) {
        return;
      }
      const res = await axiosInstance.get(
        `/user?page=${usersPage}&limit=${usersTake}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      set({
        allUsers: res.data,
        usersLength: res.data.length,
      });
    } catch (e) {
      const errorMessage = handleApiError(e as AxiosError<ErrorResponse>);
      set({ axiosError: errorMessage });
    }
  },
  getAllFiles: async () => {
    const { filesPage, filesTake } = get();
    try {
      const accessToken = useAuthStore.getState().accessToken;
      if (!accessToken) {
        return;
      }

      const res = await axiosInstance.get(
        `file/all?page=${filesPage}&limit=${filesTake}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      set({
        allFiles: res.data.allFiles,
        filesLength: res.data.filesTotalLength,
      });
    } catch (e) {
      const errorMessage = handleApiError(e as AxiosError<ErrorResponse>);
      set({ axiosError: errorMessage });
    }
  },
}));
