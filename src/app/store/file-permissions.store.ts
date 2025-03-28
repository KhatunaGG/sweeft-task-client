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

//****************************************************************************************** */

//before local storage
// import { create } from "zustand";
// import { useUtilities } from "./utilities.store";
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
//   file: File | null;
//   fileError: string;
//   selectedUsers: { permissionById: string; permissionByEmail: string }[];
//   checked: string | null;
//   uploadedFile: null;
//   axiosError: string | null;
//   resStatus: number | null;
//   showUsers: boolean;

//   setOpen: (open: boolean) => void;
//   setFile: (file: File | null) => void;
//   setFileError: (fileError: string) => void;
//   setSelectedUsers: (
//     selectedUsers: { permissionById: string; permissionByEmail: string }[]
//   ) => void;
//   setChecked: (checked: string | null | SetStateAction<string | null>) => void;
//   setShowUsers: (showUsers: boolean) => void;
//   setUploadedFile: (uploadedFile: null) => void;
//   setResStatus: (resStatus: number | null) => void;
//   handleUserSelection: (
//     userId: string,
//     email: string,
//     isChecked: boolean
//   ) => void;
//   uploadFile: () => void;
//   handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
// }

// export const UseFilePermissionsStore = create<IPermissions>((set, get) => ({
//   open: false,
//   file: null,
//   fileError: "",
//   selectedUsers: [],
//   checked: null,
//   uploadedFile: null,
//   axiosError: null,
//   resStatus: 0,
//   showUsers: false,

//   setOpen: (open: boolean) => set({ open }),
//   setFile: (file: File | null) => set({ file }),
//   setFileError: (fileError: string) => set({ fileError }),
//   setSelectedUsers: (
//     selectedUsers: { permissionById: string; permissionByEmail: string }[]
//   ) => set({ selectedUsers }),
//   setChecked: (checked) => {
//     set((state) => ({
//       checked: typeof checked === "function" ? checked(state.checked) : checked,
//     }));
//   },
//   setShowUsers: (showUsers: boolean) => set({ showUsers }),
//   setUploadedFile: (uploadedFile: null) => set({ uploadedFile }),
//   setResStatus: (resStatus: number | null) => set({ resStatus }),

//   handleUserSelection: (userId: string, email: string, isChecked: boolean) => {
//     const { selectedUsers } = get();

//     if (isChecked) {
//       set({
//         selectedUsers: [
//           ...selectedUsers,
//           { permissionById: userId, permissionByEmail: email },
//         ],
//       });
//     } else {
//       const index = selectedUsers.findIndex(
//         (user) =>
//           user.permissionById === userId && user.permissionByEmail === email
//       );
//       if (index !== -1) {
//         const updatedSelectedUsers = [...selectedUsers];
//         updatedSelectedUsers.splice(index, 1);
//         set({ selectedUsers: updatedSelectedUsers });
//       }
//     }
//   },

//   uploadFile: async () => {
//     const accessToken = useAuthStore.getState().accessToken;
//     const getAllFiles = useUtilities.getState().getAllFiles;
//     const user = useAuthStore.getState().user;
//     const company = useAuthStore.getState().company;
//     const { file, selectedUsers, setFileError } = get();

//     // if (!file || !accessToken) return;
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
//       if (res.status >= 200 && res.status <= 204) {
//         getAllFiles();
//         set({
//           file: null,
//           uploadedFile: res.data.uploadedFile,
//           selectedUsers: [],
//           checked: null,
//           open: false,
//         });
//         toast.success("File uploaded successfully");
//       } else {
//         toast.error("File upload failed");
//       }
//     } catch (e) {
//       const errorMessage = handleApiError(e as AxiosError<ErrorResponse>);
//       set({
//         axiosError: errorMessage,
//         file: undefined,
//       });
//       toast.error(errorMessage);
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
//       setFile(null);
//     }
//   },
// }));




import { create } from "zustand";
import { useAuthStore } from "./sign-in.store";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import { axiosInstance } from "../libs/axiosInstance";
import { SetStateAction } from "react";
import { useUtilities } from "./utilities.store";

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
  selectedUsers: { permissionById: string; permissionByEmail: string }[];
  checked: string | null;
  uploadedFile: null;
  axiosError: string | null;
  resStatus: number | null;
  showUsers: boolean;

  setOpen: (open: boolean) => void;
  setFile: (file: File | null) => void;
  setFileError: (fileError: string) => void;
  setSelectedUsers: (
    selectedUsers: { permissionById: string; permissionByEmail: string }[]
  ) => void;
  setChecked: (checked: string | null | SetStateAction<string | null>) => void;
  setShowUsers: (showUsers: boolean) => void;
  setUploadedFile: (uploadedFile: null) => void;
  setResStatus: (resStatus: number | null) => void;
  handleUserSelection: (
    userId: string,
    email: string,
    isChecked: boolean
  ) => void;
  uploadFile: () => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  initializeState: () => void;
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
  showUsers: false,

  setOpen: (open: boolean) => {
    set({ open });
    if (typeof window !== "undefined") {
      localStorage.setItem('open', JSON.stringify(open));
    }
  },

  setFile: (file: File | null) => {
    set({ file });
    if (file) {
      // const fileName = file.name || "";
      // const fileType = file.type || "";
      // const fileSize = file.size || 0;
      if (typeof window !== "undefined") {
        // localStorage.setItem('file', JSON.stringify({ name: fileName, type: fileType, size: fileSize }));
        localStorage.setItem('file', JSON.stringify(file));
      }
    } else {
      if (typeof window !== "undefined") {
        localStorage.removeItem('file');
      }
    }
  },

  setFileError: (fileError: string) => set({ fileError }),
  setSelectedUsers: (selectedUsers) => set({ selectedUsers }),
  setChecked: (checked) => {
    set((state) => {
      const newChecked = typeof checked === "function" ? checked(state.checked) : checked;
      if (typeof window !== "undefined") {
        localStorage.setItem('checked', JSON.stringify(newChecked)); 
      }
      return { checked: newChecked };
    });
  },
  setShowUsers: (showUsers: boolean) => set({ showUsers }),
  setUploadedFile: (uploadedFile: null) => set({ uploadedFile }),
  setResStatus: (resStatus: number | null) => set({ resStatus }),

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
        (user) => user.permissionById === userId && user.permissionByEmail === email
      );
      if (index !== -1) {
        const updatedSelectedUsers = [...selectedUsers];
        updatedSelectedUsers.splice(index, 1); 
        set({ selectedUsers: updatedSelectedUsers });
      }
    }
    if (typeof window !== "undefined") {
      localStorage.setItem('selectedUsers', JSON.stringify(get().selectedUsers));
    }
  },
  
  uploadFile: async () => {
    const getAllFiles = useUtilities.getState().getAllFiles;
    const accessToken = useAuthStore.getState().accessToken;
    const user = useAuthStore.getState().user;
    const company = useAuthStore.getState().company;
    const { file, selectedUsers, setFileError } = get();

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
        getAllFiles();
        set({
          file: null,
          uploadedFile: res.data.uploadedFile,
          selectedUsers: [],
          checked: null,
          open: false,
        });

        toast.success("File uploaded successfully");

        if (typeof window !== "undefined") {
          localStorage.removeItem('selectedUsers');
          localStorage.removeItem('checked');
          localStorage.removeItem('open');
          localStorage.removeItem('file');
        }
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
      setFile(selectedFile);
    } else {
      setFile(null);
    }
  },

  initializeState: () => {
    if (typeof window !== "undefined") {
      const savedSelectedUsers = localStorage.getItem('selectedUsers');
      const savedChecked = localStorage.getItem('checked');
      const savedFile = localStorage.getItem('file');
      const savedOpen = localStorage.getItem('open');
  
      if (savedSelectedUsers) {
        set({ selectedUsers: JSON.parse(savedSelectedUsers) });
      }
      if (savedChecked) {
        set({ checked: JSON.parse(savedChecked) });
      }
      if (savedFile) {
        const parsedFile = JSON.parse(savedFile);
        set({ file: parsedFile }); 
      }
      if (savedOpen) {
        set({ open: JSON.parse(savedOpen) });
      }
    }
  },
  
  
}));
