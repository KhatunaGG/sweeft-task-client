// "use client";
// import { create } from "zustand";
// import { CompanyType } from "../components/SignUp";

// export interface ICompanyStore {
//   // formState: {
//   //   name: string;
//   //   email: string;
//   //   password: string;
//   //   country: string;
//   //   industry: string;
//   // };
//   formState: CompanyType;
//   setFormState: (formState: ICompanyStore["formState"]) => void;
//   // resetFormState: () => void;
// }

// export const useCompanyStore = create<ICompanyStore>((set) => ({
//   formState: {
//     name: "",
//     email: "",
//     password: "",
//     country: "",
//     industry: "",
//   },

//   setFormState: (formState) => set({ formState }),
// }));



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
    // set({ isLoading: true, axiosError: "" });
    try {
      const res = await axiosInstance.post("/auth/sign-up", data);
      if (res.status >= 200 && res.status <= 204) {
        set({ isLoading: true, axiosError: "", success: true});
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
      set({ isLoading: false });
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
    }
  },
}));

export const logCompanyStore = () => {
  console.log(useCompanyStore.getState().formState, "STORE login");
};
