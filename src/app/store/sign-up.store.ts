"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
// import { CompanyType } from "../components/SignUp";
import { axiosInstance } from "../libs/axiosInstance";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { CompanyType, ErrorResponse, ICompanyStore } from "../interface";

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

// export interface ICompanyStore {
//   formState: CompanyType;
//   setFormState: (formState: ICompanyStore["formState"]) => void;
//   createCompany: (data: CompanyType) => void;
//   resendEmail: string;
//   setResendEmail: (resendEmail: string) => void;
//   success: boolean;
//   axiosError: string;
//   isLoading: boolean;
//   linkResendCount: number;
//   setLinkResendCount: (linkResendCount: number) => void;
//   getResendLink: (email: string) => void;

//   clearPersistedState: () => void;
// }

export const useCompanyStore = create<ICompanyStore>()(
  persist(
    (set, get) => ({
      formState: {
        name: "",
        email: "",
        password: "",
        country: "",
        industry: "",
      },
      linkResendCount: 0,
      resendEmail: "",
      setResendEmail: (resendEmail: string) => set({ resendEmail }),

      success: false,
      axiosError: "",
      isLoading: false,

      setLinkResendCount: (linkResendCount) => set({ linkResendCount }),
      setFormState: (formState) => set({ formState }),

      clearPersistedState: () => {
        set({
          resendEmail: "",
          linkResendCount: 0,
        });
        localStorage.removeItem("company-store");
      },

      createCompany: async (data: CompanyType) => {
        set({ resendEmail: data.email });

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
          const errorMessage = handleApiError(e as AxiosError<ErrorResponse>);
          set({ axiosError: errorMessage });
        } finally {
          set({ isLoading: false });
        }
      },

      getResendLink: async (email: string) => {
        const emailToUse = email || get().resendEmail;

        if (!emailToUse) {
          toast.error("Email address is required");
          return;
        }

        try {
          set({ isLoading: true });
          const res = await axiosInstance.post(`/auth/resend-link`, {
            email: emailToUse,
          });
          if (res.status >= 200 && res.status <= 204) {
            set({ linkResendCount: get().linkResendCount + 1 });
            toast.success("Link sent successfully! Please check your email.");
          }
        } catch (e) {
          const errorMessage = handleApiError(e as AxiosError<ErrorResponse>);
          set({ axiosError: errorMessage });
        } finally {
          set({ isLoading: false });
        }
      },
    }),

    {
      name: "company-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        resendEmail: state.resendEmail,
        linkResendCount: state.linkResendCount,
      }),
    }
  )
);
