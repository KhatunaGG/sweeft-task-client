// import { create } from "zustand";
// import { IUser } from "../hooks/use-token";
// import { axiosInstance } from "../libs/axiosInstance";
// import { useAuthStore } from "./sign-in.store";

// export interface IFile {
//   _id: string;
//   filePath: string;
//   fileOwnerId: string;
//   fileOwnerCompanyId: string;
//   userPermissions: string[];
//   fileName: string;
//   extension: string;

//   contentType?: string;
// }

// export interface IUtilities {
//   allUsers: IUser[];
//   allFiles: IFile[];
//   usersLength: number;
//   filesLength: number;
//   setAllFiles: (allFiles: IFile[]) => void;
//   setAllUsers: (allUsers: IUser[]) => void;
//   getAllUsers: () => Promise<void>;
//   getAllFiles: () => Promise<void>;
// }

// export const useUtilities = create<IUtilities>((set) => ({
//   allUsers: [],
//   usersLength: 0,
//   allFiles: [],
//   filesLength: 0,

//   setAllUsers: (allUsers: IUser[]) => {
//     set({
//       allUsers,
//       usersLength: allUsers.length,
//     });
//   },

//   setAllFiles: (allFiles: IFile[]) => {
//     set({
//       allFiles,
//       filesLength: allFiles.length,
//     });
//   },

//   setFilesLength: (length: number) => {
//     set({ filesLength: length });
//   },

//   getAllUsers: async () => {
//     try {
//       const accessToken = useAuthStore.getState().accessToken;
//       if (!accessToken) {
//         return;
//       }

//       const res = await axiosInstance.get("/user", {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });

//       set({
//         allUsers: res.data,
//         usersLength: res.data.length,
//       });
//     } catch (e) {
//       console.log(e);
//     }
//   },

//   getAllFiles: async () => {
//     try {
//       const accessToken = useAuthStore.getState().accessToken;
//       if (!accessToken) {
//         return;
//       }

//       const res = await axiosInstance.get("/file", {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });

//       set({
//         allFiles: res.data,
//         filesLength: res.data.length,
//       });
//     } catch (e) {
//       console.log(e);
//     }
//   },
// }));

import { create } from "zustand";
import { IUser } from "../hooks/use-token";
import { axiosInstance } from "../libs/axiosInstance";
import { useAuthStore } from "./sign-in.store";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

export interface IFile {
  _id: string;
  filePath: string;
  fileOwnerId: string;
  fileOwnerCompanyId: string;
  userPermissions: string[];
  fileName: string;
  extension: string;
  contentType?: string;
}

interface ErrorResponse {
  message: string;
}

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

export interface IUtilities {
  allUsers: IUser[];
  allFiles: IFile[];
  usersLength: number;
  filesLength: number;
  page: number;
  take: number;
  axiosError?: string | null;

  setAxiosError: (axiosError: string | null) => void;
  setPage: (page: number) => void;
  setTake: (take: number) => void;
  setAllFiles: (allFiles: IFile[]) => void;
  setAllUsers: (allUsers: IUser[]) => void;
  getAllUsers: () => Promise<void>;
  getAllFiles: () => Promise<void>;
}

export const useUtilities = create<IUtilities>((set, get) => ({
  allUsers: [],
  usersLength: 0,
  allFiles: [],
  filesLength: 0,
  page: 1,
  take: 5,
  axiosError: null,


  setAxiosError: (axiosError) => set({axiosError}),
  setPage: (page) => set({ page }),
  setTake: (take) => set({ take }),
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
    try {
      const accessToken = useAuthStore.getState().accessToken;
      if (!accessToken) {
        return;
      }
      const res = await axiosInstance.get("/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

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
    const { page, take } = get();
    try {
      const accessToken = useAuthStore.getState().accessToken;
      if (!accessToken) {
        return;
      }

      const res = await axiosInstance.get(
        `file/all?page=${page}&limit=${take}`,
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
