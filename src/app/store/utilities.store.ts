// import { create } from "zustand";
// import { IUser } from "../hooks/use-token";
// import { axiosInstance } from "../libs/axiosInstance";
// import { useAuthStore } from "./sign-in.store";
// import axios, { AxiosError } from "axios";
// import { toast } from "react-toastify";

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

// interface ErrorResponse {
//   message: string;
// }

// const handleApiError = (error: AxiosError<ErrorResponse>): string => {
//   if (axios.isAxiosError(error)) {
//     const errorMessage = error.response?.data.message || "An error occurred";
//     toast.error(errorMessage);
//     return errorMessage;
//   }
//   const unexpectedError = "An unexpected error occurred";
//   toast.error(unexpectedError);
//   return unexpectedError;
// };

// export interface IUtilities {
//   allUsers: IUser[];
//   allFiles: IFile[];
//   usersLength: number;
//   filesLength: number;
//   page: number;
//   take: number;
//   axiosError?: string | null;

//   setAxiosError: (axiosError: string | null) => void;
//   setPage: (page: number) => void;
//   setTake: (take: number) => void;
//   setAllFiles: (allFiles: IFile[]) => void;
//   setAllUsers: (allUsers: IUser[]) => void;
//   getAllUsers: () => Promise<void>;
//   getAllFiles: () => Promise<void>;
// }

// export const useUtilities = create<IUtilities>((set, get) => ({
//   allUsers: [],
//   usersLength: 0,
//   allFiles: [],
//   filesLength: 0,
//   page: 1,
//   take: 5,
//   axiosError: null,


//   setAxiosError: (axiosError) => set({axiosError}),
//   setPage: (page) => set({ page }),
//   setTake: (take) => set({ take }),
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
//     const { page, take } = get();
//     try {
//       const accessToken = useAuthStore.getState().accessToken;
//       if (!accessToken) {
//         return;
//       }
//       const res = await axiosInstance.get(`/user?page=${page}&limit=${take}`, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });

//       set({
//         allUsers: res.data,
//         usersLength: res.data.length,
//       });
//     } catch (e) {
//       const errorMessage = handleApiError(e as AxiosError<ErrorResponse>);
//       set({ axiosError: errorMessage });
//     }
//   },
//   getAllFiles: async () => {
//     const { page, take } = get();
//     try {
//       const accessToken = useAuthStore.getState().accessToken;
//       if (!accessToken) {
//         return;
//       }

//       const res = await axiosInstance.get(
//         `file/all?page=${page}&limit=${take}`,
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );
//       set({
//         allFiles: res.data.allFiles,
//         filesLength: res.data.filesTotalLength,
//       });
//     } catch (e) {
//       const errorMessage = handleApiError(e as AxiosError<ErrorResponse>);
//       set({ axiosError: errorMessage });
//     }
//   },
// }));


















import { create } from "zustand";
// import { IUser } from "../hooks/use-token";
import { axiosInstance } from "../libs/axiosInstance";
import { useAuthStore } from "./sign-in.store";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

export interface IUser {
  _id: string;
  userEmail: string;
  companyId: string;
  isVerified: boolean;
  validationLink: string | null;
  validationLinkValidateDate: string | null;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  firstName?: string;
  lastName?: string;
}

export interface ICompany {
  _id: string;
  name: string;
  email: string;
  country: string;
  industry: string;
  isVerified: boolean;
  validationLink: string | null;
  validationLinkValidateDate: string | null;
  role: string;
  subscriptionPlan: string;
  uploadedFiles: string[];
  user: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
 
  

premiumCharge: number;
extraUserCharge: number;
extraFileCharge: number

}


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
  usersPage: number;
  usersTake: number;
  filesPage: number;
  filesTake: number;
  axiosError?: string | null;

  setAxiosError: (axiosError: string | null) => void;
  setUsersPage: (page: number) => void;
  setUsersTake: (take: number) => void;
  setFilesPage: (page: number) => void;
  setFilesTake: (take: number) => void;
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
  usersPage: 1, 
  usersTake: 5,
  filesPage: 1,  
  filesTake: 5, 
  axiosError: null,


  setAxiosError: (axiosError) => set({axiosError}),
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
      const res = await axiosInstance.get(`/user?page=${usersPage}&limit=${usersTake}`, {
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
