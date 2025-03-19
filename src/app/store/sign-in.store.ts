import { create } from "zustand";
import { SignInType } from "../components/SignIn";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { axiosInstance } from "../libs/axiosInstance";
import { getCookie, setCookie } from "cookies-next";

interface ErrorResponse {
  message: string;
}

export interface ISignIn {
  signInFormState: SignInType;
  verificationStatus: { success: boolean; message: string } | null;
  axiosError: string | null;
  isLoading: boolean;
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  setVerificationStatus: (status: {
    success: boolean;
    message: string;
  }) => void;
  setEmail: (email: string) => void;
  verifyEmail: (token: string) => void;
  login: (data: SignInType) => void;
  // initialize: () => Promise<void>;
  initialize: () => void;
}

const handleApiError = (error: AxiosError<ErrorResponse>): string => {
  // Set type as AxiosError
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

  setAccessToken: (token: string) => set({ accessToken: token }),
  setVerificationStatus: (status) =>
    set(() => ({ verificationStatus: status })),
  setEmail: (email) =>
    set((state) => ({
      signInFormState: { ...state.signInFormState, email },
    })),
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
      }
    } catch (e) {
      const errorMessage = handleApiError(e as AxiosError<ErrorResponse>);
      set({ axiosError: errorMessage });
    } finally {
      set({ isLoading: false });
    }
  },

  initialize: async () => {
    const token = await getCookie("accessToken") as string;
    if (token) {
      set({ accessToken: token });

    } else {
      return
    }
  },

  // initialize: () => {
  //   const token = getCookie("accessToken") as string;
  //   if (token) {
  //     set({ accessToken: token });
  //   }
  // },
}));







// import { create } from "zustand";
// import { SignInType } from "../components/SignIn";
// import axios, { AxiosError } from "axios";
// import { toast } from "react-toastify";
// import { axiosInstance } from "../libs/axiosInstance";
// import { getCookie, setCookie } from "cookies-next";

// interface ErrorResponse {
//   message: string;
// }

// export interface ISignIn {
//   signInFormState: SignInType;
//   verificationStatus: { success: boolean; message: string } | null;
//   axiosError: string | null;
//   isLoading: boolean;
//   accessToken: string;
//   setAccessToken: (token: string) => void;
//   setVerificationStatus: (status: {
//     success: boolean;
//     message: string;
//   }) => void;
//   setEmail: (email: string) => void;
//   verifyEmail: (token: string) => void;
//   login: (data: SignInType) => void;
//   // initialize: () => Promise<void>;
//   initialize: () => void;
// }

// // const handleApiError = (error: any) => {
// //   if (axios.isAxiosError(error)) {
// //     const errorMessage = error.response?.data.message || "An error occurred";
// //     toast.error(errorMessage);
// //     return errorMessage;
// //   }
// //   const unexpectedError = "An unexpected error occurred";
// //   toast.error(unexpectedError);
// //   return unexpectedError;
// // };

// const handleApiError = (error: AxiosError<ErrorResponse>): string => {
//   // Set type as AxiosError
//   if (axios.isAxiosError(error)) {
//     const errorMessage = error.response?.data.message || "An error occurred";
//     toast.error(errorMessage);
//     return errorMessage;
//   }
//   const unexpectedError = "An unexpected error occurred";
//   toast.error(unexpectedError);
//   return unexpectedError;
// };

// export const useAuthStore = create<ISignIn>((set) => ({
//   signInFormState: { email: "", password: "" },
//   verificationStatus: null,
//   axiosError: null,
//   isLoading: false,
//   accessToken: "",

//   setAccessToken: (token) => set((state) => ({ accessToken: token })),
//   setVerificationStatus: (status) =>
//     set(() => ({ verificationStatus: status })),
//   setEmail: (email) =>
//     set((state) => ({
//       signInFormState: { ...state.signInFormState, email },
//     })),
//   verifyEmail: async (token) => {
//     try {
//       set({ isLoading: true });
//       const res = await axiosInstance.get(`/auth/verify-email?token=${token}`);
//       if (res.status >= 200 && res.status <= 204) {
//         set({
//           verificationStatus: {
//             success: true,
//             message: res.data.message || "Email verified successfully!",
//           },
//         });
//         toast.success("Email verified successfully!");
//       }
//     } catch (e) {
//       const errorMessage = handleApiError(e as AxiosError<ErrorResponse>);
//       set({ axiosError: errorMessage });
//     } finally {
//       set({ isLoading: false });
//     }
//   },

//   login: async (data) => {
//     set({ isLoading: true });
//     try {
//       const res = await axiosInstance.post("/auth/sign-in", data);
//       if (res.status >= 200 && res.status <= 204) {
//         const { accessToken } = res.data;
//         set({
//           verificationStatus: { success: true, message: "" },
//           signInFormState: { email: "", password: "" },
//           accessToken,
//         });
//         setCookie("accessToken", accessToken, { maxAge: 60 * 60 });
//       }
//     } catch (e) {
//       const errorMessage = handleApiError(e as AxiosError<ErrorResponse>);
//       set({ axiosError: errorMessage });
//     } finally {
//       set({ isLoading: false });
//     }
//   },

//   initialize: () => {
//     const token = getCookie("accessToken") as string;
//     if (token) {
//       set({ accessToken: token });
//     }
//   },
// }));

