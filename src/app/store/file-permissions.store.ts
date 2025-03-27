// import { create } from "zustand";
// import { IFile } from "./utilities.store";
// import axios, { AxiosError } from "axios";
// import { toast } from "react-toastify";
// import { axiosInstance } from "../libs/axiosInstance";
// import { SetStateAction } from "react";
// import { useAuthStore } from "./sign-in.store";

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

// export interface IPermissions {
//   open: boolean;
//   file: File | undefined;
//   fileError: string;
//   selectedUsers: string[];
//   checked: string | null;
//   uploadedFile: IFile[];
//   axiosError: string | null;
//   resStatus: number | null,

//   setOpen: (open: boolean) => void;
//   setFile: (file: File | undefined) => void;
//   setFileError: (fileError: string) => void;
//   setSelectedUsers: (selectedUsers: string[]) => void;
//   // setChecked: (checked: string | null) => void;
//   setChecked: (checked: string | null | SetStateAction<string | null>) => void;
//   setUploadedFile: (uploadedFile: IFile[]) => void;
//   setResStatus: (resStatus: number | null) => void;
//   handleUserSelection: (userId: string, isChecked: boolean) => void;
//   uploadFile: () => void;
//   handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
// }

// export const UseFilePermissionsStore = create<IPermissions>((set, get) => ({
//   open: false,
//   file: undefined,
//   fileError: "",
//   selectedUsers: [],
//   checked: null,
//   uploadedFile: [],
//   axiosError: null,
//   resStatus: 0,

//   setOpen: (open: boolean) => set({ open }),
//   setFile: (file: File | undefined) => set({ file }),
//   setFileError: (fileError: string) => set({ fileError }),
//   setSelectedUsers: (selectedUsers: string[]) => set({ selectedUsers }),
//   // setChecked: (checked: string | null) => set({ checked }),
//   setChecked: (checked) => {
//     set(state => ({
//       checked: typeof checked === 'function'
//         ? checked(state.checked)
//         : checked
//     }));
//   },

//   setUploadedFile: (uploadedFile: IFile[]) => set({ uploadedFile }),
//   setResStatus: (resStatus: number | null) => set({ resStatus }),

//   handleUserSelection: (userId: string, isChecked: boolean) => {
//     const { selectedUsers } = get();
//     const { file } = get();
//     if (file) {
//       if (isChecked) {
//         set({ selectedUsers: [...selectedUsers, userId] });
//       } else {
//         const index = selectedUsers.indexOf(userId);
//         if (index !== -1) {
//           const updatedSelectedUsers = [...selectedUsers];
//           set({ selectedUsers: updatedSelectedUsers });
//         }
//       }
//     }
//   },

//   uploadFile: async () => {
//     const accessToken = useAuthStore.getState().accessToken;
//     const user = useAuthStore.getState().user;
//     const company = useAuthStore.getState().company;
//     const {
//       file,
//       selectedUsers,
//       setFileError,
//       setUploadedFile,
//       setOpen,
//       setFile,
//       setChecked,
//       setResStatus
//     } = get();

//     if (!file) {
//       setFileError("Please select a file to upload.");
//       return;
//     }
//     try {
//       const formData = new FormData();
//       formData.append("file", file);
//       formData.append("fileOwnerId", user ? user._id : company?._id || "");
//       formData.append("fileName", file.name || "");
//       formData.append("userPermissions", JSON.stringify(selectedUsers));

//       const res = await axiosInstance.post("/file/upload-file", formData, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       console.log(res.data.status, "res.data.status from STORE")
//       console.log(res.data, "res.data from STORE")
//       if (res.status >= 200 && res.status <= 204) {
//         setUploadedFile(res.data.uploadedFile);
//         setResStatus(res.data.status)
//         setOpen(false);
//         setFile(undefined);
//         setChecked(null);
//         toast.success("File uploaded successfully");
//       } else {
//         toast.error("File upload failed");
//       }
//     } catch (e) {
//       const errorMessage = handleApiError(e as AxiosError<ErrorResponse>);
//       set({ axiosError: errorMessage });
//     }
//   },

//   handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { setFile } = get();
//     const selectedFile = event.target.files?.[0];
//     if (selectedFile) {
//       const fileExtension = selectedFile.name
//         .split(".")
//         .pop()
//         ?.toLocaleLowerCase();
//       if (!fileExtension || !["csv", "xls", "xlsx"].includes(fileExtension)) {
//         toast.error("Only CSV, XLS, or XLSX files are allowed");
//         return;
//       }
//       setFile(selectedFile);
//     } else {
//       setFile(undefined);
//     }
//   },
// }));

import { create } from "zustand";
import { useUtilities } from "./utilities.store";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { axiosInstance } from "../libs/axiosInstance";
import { SetStateAction } from "react";
import { useAuthStore } from "./sign-in.store";

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

export interface IPermissions {
  open: boolean;
  file: File | null;
  fileError: string;
  // selectedUsers: string[];
  selectedUsers: { permissionById: string; permissionByEmail: string }[];
  checked: string | null;
  uploadedFile: null;
  axiosError: string | null;
  resStatus: number | null;

  setOpen: (open: boolean) => void;
  setFile: (file: File | null) => void;
  setFileError: (fileError: string) => void;
  // setSelectedUsers: (selectedUsers: string[]) => void;
  setSelectedUsers: (
    selectedUsers: { permissionById: string; permissionByEmail: string }[]
  ) => void;
  // setChecked: (checked: string | null) => void;
  setChecked: (checked: string | null | SetStateAction<string | null>) => void;
  setUploadedFile: (uploadedFile: null) => void;
  setResStatus: (resStatus: number | null) => void;
  // handleUserSelection: (userId: string, isChecked: boolean) => void;
  handleUserSelection: (
    userId: string,
    email: string,
    isChecked: boolean
  ) => void;
  uploadFile: () => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const UseFilePermissionsStore = create<IPermissions>((set, get) => ({
  open: false,
  file: null,
  fileError: "",
  selectedUsers: [],
  checked: null,
  uploadedFile: null,
  axiosError: null,
  resStatus: 0,

  setOpen: (open: boolean) => set({ open }),
  setFile: (file: File | null) => set({ file }),
  setFileError: (fileError: string) => set({ fileError }),
  // setSelectedUsers: (selectedUsers: string[]) => set({ selectedUsers }),
  setSelectedUsers: (
    selectedUsers: { permissionById: string; permissionByEmail: string }[]
  ) => set({ selectedUsers }),
  // setChecked: (checked: string | null) => set({ checked }),
  setChecked: (checked) => {
    set((state) => ({
      checked: typeof checked === "function" ? checked(state.checked) : checked,
    }));
  },

  setUploadedFile: (uploadedFile: null) => set({ uploadedFile }),
  setResStatus: (resStatus: number | null) => set({ resStatus }),

  // handleUserSelection: (userId: string, isChecked: boolean) => {
  //   const { selectedUsers } = get();
  //   const { file } = get();
  //   if (file) {
  //     if (isChecked) {
  //       set({ selectedUsers: [...selectedUsers, userId] });
  //     } else {
  //       const index = selectedUsers.indexOf(userId);
  //       if (index !== -1) {
  //         const updatedSelectedUsers = [...selectedUsers];
  //         set({ selectedUsers: updatedSelectedUsers });
  //       }
  //     }
  //   }
  // },

  handleUserSelection: (userId: string, email: string, isChecked: boolean) => {
    const { selectedUsers } = get();

    if (isChecked) {
      set({
        selectedUsers: [
          ...selectedUsers,
          { permissionById: userId, permissionByEmail: email },
        ],
      });
    } else {
      const index = selectedUsers.findIndex(
        (user) =>
          user.permissionById === userId && user.permissionByEmail === email
      );
      if (index !== -1) {
        const updatedSelectedUsers = [...selectedUsers];
        updatedSelectedUsers.splice(index, 1);
        set({ selectedUsers: updatedSelectedUsers });
      }
    }
  },

  uploadFile: async () => {
    const accessToken = useAuthStore.getState().accessToken;
    const getAllFiles = useUtilities.getState().getAllFiles;
    const user = useAuthStore.getState().user;
    const company = useAuthStore.getState().company;
    const { file, selectedUsers, setFileError } = get();

    // if (!file || !accessToken) return;
    if (!file) {
      setFileError("Please select a file to upload.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileOwnerId", user ? user._id : company?._id || "");
      formData.append("fileName", file.name || "");
      formData.append("userPermissions", JSON.stringify(selectedUsers));

      const res = await axiosInstance.post("/file/upload-file", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (res.status >= 200 && res.status <= 204) {
        getAllFiles()
        set({
          file: null,
          uploadedFile: res.data.uploadedFile,
          selectedUsers: [],
          checked: null,
          open: false,
        });
        toast.success("File uploaded successfully");
      } else {
        toast.error("File upload failed");
      }
    } catch (e) {
      const errorMessage = handleApiError(e as AxiosError<ErrorResponse>);
      set({
        axiosError: errorMessage,
        file: undefined,
      });
      toast.error(errorMessage);
    }
  },

  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => {
    const { setFile } = get();
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const fileExtension = selectedFile.name
        .split(".")
        .pop()
        ?.toLocaleLowerCase();
      if (!fileExtension || !["csv", "xls", "xlsx"].includes(fileExtension)) {
        toast.error("Only CSV, XLS, or XLSX files are allowed");
        return;
      }
      setFile(selectedFile);
    } else {
      setFile(null);
    }
  },
}));
