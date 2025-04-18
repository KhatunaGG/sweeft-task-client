"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { axiosInstance } from "../libs/axiosInstance";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { CompanyType, ErrorResponse, ICompanyStore } from "../interface";

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
      success: false,
      axiosError: "",
      isLoading: false,

      show: false,
      setShow: (show) => set({ show }),

      setResendEmail: (resendEmail: string) => set({ resendEmail }),
      setLinkResendCount: (linkResendCount) => set({ linkResendCount }),
      setFormState: (formState) => set({ formState }),
      clearPersistedState: () => {
        set({
          resendEmail: "",
          linkResendCount: 0,
          show: false,
        });
        localStorage.removeItem("company-store");
      },

      createCompany: async (data: CompanyType) => {
        set({ resendEmail: data.email });
        set({ show: true });
        // set({ linkResendCount: get().linkResendCount + 1 });
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
            // set({ linkResendCount: get().linkResendCount + 1 });

            const newCount = get().linkResendCount + 1;

            if (newCount >= 3) {
              get().clearPersistedState(); // Clear first
            } else {
              set({ linkResendCount: newCount }); // Only update count if not clearing
            }

            toast.success("Link sent successfully! Please check your email.");
          }
        } catch (e) {
          const errorMessage = handleApiError(e as AxiosError<ErrorResponse>);
          set({ axiosError: errorMessage });
        } finally {
          set({ isLoading: false });
          if (get().linkResendCount >= 3) {
            get().clearPersistedState();
          }
        }
      },
    }),

    {
      name: "company-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        resendEmail: state.resendEmail,
        linkResendCount: state.linkResendCount,
        show: state.show,
      }),
    }
  )
);
