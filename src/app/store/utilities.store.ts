// import { create } from "zustand";
// import { IUser } from "../hooks/use-token";
// import { axiosInstance } from "../libs/axiosInstance";
// import { useAuthStore } from "./sign-in.store";

// export interface IFile {
//   _id: string;
//   filePath: string;
//   fileOwnerId: string;
//   fileOwnerCompanyId: string;
//   userPermissions: File[];
//   fileName: string
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
//     set({ allUsers });
//     set(() => {
//       const length = allUsers.length;
//       return { usersLength: length };
//     });
//   },

//   setAllFiles: (allFiles: IFile[]) => {
//     set({ allFiles });
//     set(() => {
//       const length = allFiles.length;
//       return { filesLength: length };
//     });
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
//       set({ allUsers: res.data });
//       set(() => {
//         const length = res.data.length;
//         return { usersLength: length };
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
//       console.log("Fetched files:", res.data)
//       set({ allFiles: res.data });
//       set(() => {
//         const length = res.data.length;
//         return { filesLength: length };
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

export interface IFile {
  _id: string;
  filePath: string;
  fileOwnerId: string;
  fileOwnerCompanyId: string;
  userPermissions: File[];
  fileName: string;
}

export interface IUtilities {
  allUsers: IUser[];
  allFiles: IFile[];
  usersLength: number;
  filesLength: number;
  setAllFiles: (allFiles: IFile[]) => void;
  setAllUsers: (allUsers: IUser[]) => void;
  getAllUsers: () => Promise<void>;
  getAllFiles: () => Promise<void>;
}

export const useUtilities = create<IUtilities>((set) => ({
  allUsers: [],
  usersLength: 0,
  allFiles: [],
  filesLength: 0,

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
      console.log(e);
    }
  },

  getAllFiles: async () => {
    try {
      const accessToken = useAuthStore.getState().accessToken;
      if (!accessToken) {
        return;
      }

      const res = await axiosInstance.get("/file", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      set({
        allFiles: res.data,
        filesLength: res.data.length,
      });
    } catch (e) {
      console.log(e);
    }
  },
}));
