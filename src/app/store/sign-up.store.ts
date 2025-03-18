"use client";
import { create } from "zustand";
import { CompanyType } from "../components/SignUp";
import { axiosInstance } from "../libs/axiosInstance";
import axios from "axios";
import { toast } from "react-toastify";

export interface ICompanyStore {
  formState: CompanyType;
  setFormState: (formState: ICompanyStore["formState"]) => void;
  createCompany: (data: CompanyType) => void;
  success: boolean;
  axiosError: string;
  isLoading: boolean;
}

export const useCompanyStore = create<ICompanyStore>((set) => ({
  formState: {
    name: "",
    email: "",
    password: "",
    country: "",
    industry: "",
  },

  success: false,
  axiosError: "",
  isLoading: false,
  setFormState: (formState) => set({ formState }),
  createCompany: async (data: CompanyType) => {
    try {
      const res = await axiosInstance.post("/auth/sign-up", data);
      if (res.status >= 200 && res.status <= 204) {
        set({ isLoading: true, axiosError: "", success: true });
        set({
          isLoading: true,
          axiosError: "",
          success: true,
          formState: {
            name: "",
            email: "",
            password: "",
            country: "",
            industry: "",
          },
        });
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response) {
          const errorMessage = e.response.data.message || "An error occurred";
          set({ axiosError: errorMessage, success: false });
          toast.error(errorMessage);
        } else {
          set({ axiosError: "An unexpected error occurred", success: false });
          toast.error("An unexpected error occurred");
        }
      } else {
        set({ axiosError: "An unexpected error occurred", success: false });
        toast.error("An unexpected error occurred");
      }
    } finally {
      set({ isLoading: false });
    }
  },
}));

