import { create } from "zustand";
// import { SignInType } from "../components/SignIn";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { axiosInstance } from "../libs/axiosInstance";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
// import { ICompany } from "./utilities.store";
import { useCompanyStore } from "./sign-up.store";
import { ErrorResponse, ICompany, ISignIn, IUser, SignInType } from "../interface";

// interface ErrorResponse {
//   message: string;
// }

// export interface IUser {
//   _id: string;
//   userEmail: string;
//   companyId: string;
//   isVerified: boolean;
//   validationLink: string | null;
//   validationLinkValidateDate: string | null;
//   role: string;
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
//   firstName?: string;
//   lastName?: string;
// }

// export interface ISignIn {
//   signInFormState: SignInType;
//   verificationStatus: { success: boolean; message: string } | null;
//   axiosError: string | null;
//   isLoading: boolean;
//   accessToken: string | null;
//   user: IUser | null;
//   company: ICompany | null;
//   setAccessToken: (token: string) => void;
//   setVerificationStatus: (status: {
//     success: boolean;
//     message: string;
//   }) => void;
//   setEmail: (email: string) => void;
//   setUser: (user: IUser | null) => void;
//   setCompany: (company: ICompany | null) => void;
//   verifyEmail: (token: string) => void;
//   login: (data: SignInType) => void;
//   initialize: () => void;
//   getCurranUser: (accessToken: string | undefined) => void;
//   logout: () => void;
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

export const useAuthStore = create<ISignIn>((set) => ({
  signInFormState: { email: "", password: "" },
  verificationStatus: null,
  axiosError: null,
  isLoading: false,
  accessToken: null,
  user: null,
  company: null,

  setAccessToken: (token: string) => set({ accessToken: token }),
  setVerificationStatus: (status) =>
    set(() => ({ verificationStatus: status })),
  setEmail: (email) =>
    set((state) => ({
      signInFormState: { ...state.signInFormState, email },
    })),

  setUser: (user: IUser | null) => set({ user }),
  setCompany: (company: ICompany | null) => set({ company }),

  verifyEmail: async (token) => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get(`/auth/verify-email?token=${token}`);
      if (res.status >= 200 && res.status <= 204) {
        set({
          verificationStatus: {
            success: true,
            message: res.data.message || "Email verified successfully!",
          },
        });
        toast.success("Email verified successfully!");
      }
    } catch (e) {
      const errorMessage = handleApiError(e as AxiosError<ErrorResponse>);
      set({ axiosError: errorMessage });
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (data) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post("/auth/sign-in", data);
      if (res.status >= 200 && res.status <= 204) {
        const { accessToken } = res.data;
        set({
          verificationStatus: { success: true, message: "" },
          signInFormState: { email: "", password: "" },
          accessToken,
        });
        setCookie("accessToken", accessToken, { maxAge: 60 * 60 });

        set({ user: null, company: null });
        set({ accessToken });
        await useAuthStore.getState().getCurranUser(accessToken);
      }
    } catch (e) {
      const errorMessage = handleApiError(e as AxiosError<ErrorResponse>);
      set({ axiosError: errorMessage });
    } finally {
      set({ isLoading: false });
    }
  },

  initialize: async () => {
    const token = (await getCookie("accessToken")) as string;
    if (token) {
      set({ accessToken: token });
      await useAuthStore.getState().getCurranUser(token);
    } else {
      window.location.href = "/sign-up";
    }
  },

  getCurranUser: async (accessToken: string | undefined) => {
    if (!accessToken) return;
    try {
      const res = await axiosInstance.get("/auth/current-user", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      set({ user: res.data.user, company: res.data.company });
      if (res.data.company && res.data.company.isVerified === true) {
        const { clearPersistedState } = useCompanyStore.getState();
        clearPersistedState();
      }
    } catch (e) {
      const errorMessage = handleApiError(e as AxiosError<ErrorResponse>);
      set({ axiosError: errorMessage });
    }
  },

  logout: () => {
    deleteCookie("accessToken");
    console.log("Access token deleted from cookies");
    set({ user: null, company: null, accessToken: "" });
    console.log("State reset complete");
    window.location.href = "/sign-up";
  },
}));
