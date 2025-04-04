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
  extension: string | null;

  setExtension: (extension: string | null) => void;
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
  extension: null,

  setExtension: (extension: string | null) => set({ extension }),

  setOpen: (open: boolean) => {
    set({ open });
    if (typeof window !== "undefined") {
      localStorage.setItem("open", JSON.stringify(open));
    }
  },

  setFile: (file: File | null) => {
    set({ file });
    if (file) {
      if (typeof window !== "undefined") {
        localStorage.setItem("file", JSON.stringify(file));
      }
    } else {
      if (typeof window !== "undefined") {
        localStorage.removeItem("file");
      }
    }
  },

  setFileError: (fileError: string) => set({ fileError }),
  setSelectedUsers: (selectedUsers) => set({ selectedUsers }),
  setChecked: (checked) => {
    set((state) => {
      const newChecked =
        typeof checked === "function" ? checked(state.checked) : checked;
      if (typeof window !== "undefined") {
        localStorage.setItem("checked", JSON.stringify(newChecked));
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
        (user) =>
          user.permissionById === userId && user.permissionByEmail === email
      );
      if (index !== -1) {
        const updatedSelectedUsers = [...selectedUsers];
        updatedSelectedUsers.splice(index, 1);
        set({ selectedUsers: updatedSelectedUsers });
      }
    }
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "selectedUsers",
        JSON.stringify(get().selectedUsers)
      );
    }
  },

  uploadFile: async () => {
    const getAllFiles = useUtilities.getState().getAllFiles;
    const accessToken = useAuthStore.getState().accessToken;
    const user = useAuthStore.getState().user;
    const company = useAuthStore.getState().company;
    const { file, selectedUsers, setFileError, extension } = get();

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
      formData.append("fileExtension", extension || "");

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
          resStatus: res.status,
        });

        toast.success("File uploaded successfully");

        if (typeof window !== "undefined") {
          localStorage.removeItem("selectedUsers");
          localStorage.removeItem("checked");
          localStorage.removeItem("open");
          localStorage.removeItem("file");
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
    const selectedFile = event.target.files?.[0];
    const { setFile, setExtension } = get();

    if (selectedFile) {
      const fileExtension = selectedFile.name.split(".").pop()?.toLowerCase();
      if (!fileExtension || !["csv", "xls", "xlsx"].includes(fileExtension)) {
        toast.error("Only CSV, XLS, or XLSX files are allowed");
        return;
      }
      setFile(selectedFile);
      setExtension(fileExtension);
    } else {
      setFile(null);
      setExtension(null);
    }
  },

  initializeState: () => {
    if (typeof window !== "undefined") {
      const savedSelectedUsers = localStorage.getItem("selectedUsers");
      const savedChecked = localStorage.getItem("checked");
      const savedFile = localStorage.getItem("file");
      const savedOpen = localStorage.getItem("open");

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
