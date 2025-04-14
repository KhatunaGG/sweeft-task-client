import { create } from "zustand";
// import { IUser, useAuthStore } from "./sign-in.store";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { axiosInstance } from "../libs/axiosInstance";
import { useUtilities } from "./utilities.store";
import { ErrorResponse, IDetailsPage, IUser, PermissionType } from "../interface";
import { useAuthStore } from "./sign-in.store";

// export type PermissionType = {
//   permissionById: string;
//   permissionByEmail: string;
// };

// interface ErrorResponse {
//   message: string;
// }

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

// export interface IDetailsPage {
//   selected: string | null;
//   selectedPermission: PermissionType[] | undefined;
//   axiosError: string;
//   deletedUser: IUser | null;
//   isLoading: boolean;
//   setDeletedUser: (deletedUser: IUser | null) => void;
//   resStatus: number;
//   setResStatus: (resStatus: number) => void;
//   setIsLoading: (isLoading: boolean) => void;
//   setSelected: (selected: string | null) => void;
//   setSelectedPermission: (permission: PermissionType[] | undefined) => void;
//   deleteFile: (id: string) => void;
//   getSelectedPermission: (id: string) => void;
//   updatePermissions: (permissionId: string, checked: boolean) => void;
//   deleteFileUser: (id: string) => void;
//   handleDownload: (Id: string) => void;
// }

export const useDetailsPageStore = create<IDetailsPage>((set, get) => ({
  selected: null,
  selectedPermission: undefined,
  axiosError: "",
  deletedUser: null,
  isLoading: false,

  setIsLoading: (isLoading) => set({ isLoading }),
  resStatus: 0,
  setResStatus: (resStatus) => set({ resStatus }),

  setDeletedUser: (deletedUser) => set({ deletedUser }),

  setSelected: (selected: string | null) => set({ selected }),
  setSelectedPermission: (permissions: PermissionType[] | undefined) =>
    set({ selectedPermission: permissions }),

  deleteFile: async (id: string) => {
    const { accessToken } = useAuthStore.getState();
    const { getAllFiles, filesTake, filesPage, setFilesPage, allFiles } =
      useUtilities.getState();

    if (!accessToken) return;

    set({ isLoading: true });
    try {
      const res = await axiosInstance.delete(`file/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res.status >= 200 && res.status <= 204) {
        const currentPageFiles = allFiles;
        const isLastFileOnPage = currentPageFiles.length === 1;
        const filesResponse = await axiosInstance.get(
          `file/all?page=1&limit=1`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const totalFiles = filesResponse.data.filesTotalLength;
        const totalPages = Math.ceil(totalFiles / filesTake);
        if (isLastFileOnPage && filesPage > 1 && filesPage > totalPages) {
          setFilesPage(filesPage - 1);
        } else if (totalPages === 0) {
          setFilesPage(1);
        }

        toast.success("File deleted successfully");
        getAllFiles();
      }
    } catch (e) {
      const errorMessage = handleApiError(e as AxiosError<ErrorResponse>);
      set({ axiosError: errorMessage });
    } finally {
      set({ isLoading: false });
    }
  },
  getSelectedPermission: (id: string) => {
    const { allFiles } = useUtilities.getState();
    const active = allFiles.find((item) => item._id === id);
    if (active && active.userPermissions) {
      const parsedPermissions = active.userPermissions
        .map((permission: string) => {
          try {
            const parsed =
              typeof permission === "string"
                ? JSON.parse(permission)
                : permission;
            return parsed && parsed.length > 0 ? parsed : null;
          } catch (error) {
            console.error("Error parsing user permission", error);
            return null;
          }
        })
        .filter((permission) => permission !== null);

      set({ selectedPermission: parsedPermissions.flat() as PermissionType[] });
    }
  },

  updatePermissions: async (permissionId: string, checked: boolean) => {
    const { selectedPermission, selected } = get();
    const { allUsers } = useUtilities.getState();

    const updatedPermissions = [...(selectedPermission ?? [])];
    if (checked) {
      const user = allUsers.find((user) => user._id === permissionId);
      if (
        user &&
        !updatedPermissions.some(
          (permission) => permission.permissionById === permissionId
        )
      ) {
        updatedPermissions.push({
          permissionById: permissionId,
          permissionByEmail: user.userEmail,
        });
      }
    } else {
      const index = updatedPermissions.findIndex(
        (permission) => permission.permissionById === permissionId
      );
      if (index !== -1) {
        updatedPermissions.splice(index, 1);
      }
    }

    set({ selectedPermission: updatedPermissions });

    try {
      const { accessToken } = useAuthStore.getState();
      const res = await axiosInstance.patch(
        `/file/${selected}`,
        { userPermissions: updatedPermissions },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (res.status >= 200 && res.status <= 204) {
        useUtilities.getState().getAllFiles();
      }
    } catch (e) {
      const errorMessage = handleApiError(e as AxiosError<ErrorResponse>);
      set({ axiosError: errorMessage });
    }
  },

  deleteFileUser: async (id: string) => {
    const { accessToken } = useAuthStore.getState();
    try {
      const res = await axiosInstance.delete(`/user/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (res.status >= 200 && res.status <= 204) {
        useUtilities.getState().getAllFiles();
        useUtilities.getState().getAllUsers();
        toast.success("User deleted successfully.");
      }
    } catch (e) {
      const errorMessage = handleApiError(e as AxiosError<ErrorResponse>);
      set({ axiosError: errorMessage });
    }
  },

  handleDownload: async (id: string) => {
    const { accessToken } = useAuthStore.getState();
    const state = get();
    if (!accessToken) {
      toast.error("Authentication required");
      return;
    }
    try {
      state.setIsLoading(true);
      const metadataResponse = await axiosInstance.get(`/file/metadata/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const { fileName, fileExtension } = metadataResponse.data;

      const response = await axiosInstance.get(`/file/download-file/${id}`, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const contentType =
        response.headers["content-type"] || "application/octet-stream";

      let downloadFileName = fileName;
      if (
        fileExtension &&
        !fileName.toLowerCase().endsWith(`.${fileExtension.toLowerCase()}`)
      ) {
        downloadFileName = `${fileName}.${fileExtension}`;
      }
      const blob = new Blob([response.data], { type: contentType });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = downloadFileName;
      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success("File downloaded successfully");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download file");
    } finally {
      state.setIsLoading(false);
    }
  },
}));
