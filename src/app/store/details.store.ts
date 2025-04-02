import { create } from "zustand";
import { useAuthStore } from "./sign-in.store";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { axiosInstance } from "../libs/axiosInstance";
import { useUtilities } from "./utilities.store";


export type PermissionType = {
  permissionById: string;
  permissionByEmail: string;
};

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

export interface IDetailsPage {
  selected: string | null;
  selectedPermission: PermissionType[] | undefined;
  axiosError: string;


  resStatus: number;
  setResStatus: (resStatus: number) => void;

  setSelected: (selected: string | null) => void;
  setSelectedPermission: (permission: PermissionType[] | undefined) => void;
  deleteFile: (id: string) => void;
  getSelectedPermission: (id: string) => void;
  updatePermissions: (permissionId: string, checked: boolean) => void;
  deleteFileUser: (id: string) => void;
}

export const useDetailsPageStore = create<IDetailsPage>((set, get) => ({
  selected: null,
  selectedPermission: undefined,
  axiosError: "",

  resStatus: 0,
  setResStatus: (resStatus) => set({resStatus}),

  setSelected: (selected: string | null) => set({ selected }),
  setSelectedPermission: (permissions: PermissionType[] | undefined) =>
    set({ selectedPermission: permissions }),

  deleteFile: async (id: string) => {
    const { accessToken } =
      useAuthStore.getState();
    const { getAllFiles } =
      useUtilities.getState();
    if (!accessToken) return;
    try {
      const res = await axiosInstance.delete(`file/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res.status >= 200 && res.status <= 204) {
        toast.success("File deleted successfully");
        getAllFiles();
      }
    } catch (e) {
      const errorMessage = handleApiError(e as AxiosError<ErrorResponse>);
      set({ axiosError: errorMessage });
    }
  },

  getSelectedPermission: (id: string) => {
    const { allFiles } =
      useUtilities.getState();
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
    const { accessToken, user, logout } = useAuthStore.getState();
    const isSelfDeletion = user?._id === id;
    console.log(id, "id from store")

    try {
      const res = await axiosInstance.delete(`/user/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res.status >= 200 && res.status <= 204) {
        set({resStatus: res.status})
        if (isSelfDeletion) {
          await logout();
          window.location.href = "/sign-up";
          return;
        }

        useUtilities.getState().getAllFiles();
        useUtilities.getState().getAllUsers();
        toast.success("User deleted successfully.");
      }
    } catch (e) {
      const errorMessage = handleApiError(e as AxiosError<ErrorResponse>);
      set({ axiosError: errorMessage });
    }
  },
}));
