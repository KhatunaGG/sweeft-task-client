import { create } from "zustand";
import { axiosInstance } from "../libs/axiosInstance";
import { useAuthStore } from "./sign-in.store";

interface IFileStore {
  file: File | null;
  resStatus: { resText: string; resNum: number };
  setResStatus: (resText: string, resNum: number) => void;
  setFile: (file: File) => void;
  uploadFile: (file: File) => Promise<void>;
}

export const useFileStore = create<IFileStore>((set) => ({
  file: null,
  resStatus: { resText: "", resNum: 0 },
  setFile: (file) => set({ file }),
  setResStatus: (resText, resNum) => set({ resStatus: { resText, resNum } }),
  uploadFile: async (file) => {
    try {
      const accessToken = useAuthStore.getState().accessToken;
      if (!accessToken) {
        console.log("Access token is missing!");
        return;
      }
      const formData = new FormData();
      formData.append("file", file);

      const res = await axiosInstance.post("/file/upload-file", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res.status >= 200 && res.status <= 204) {
        alert("File uploaded successfully");
      } else {
        alert("File upload failed");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file.");
    }
  },
}));
