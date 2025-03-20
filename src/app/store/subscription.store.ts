// import { create } from "zustand";
// import { ETier } from "../enums/Industries";
// import { axiosInstance } from "../libs/axiosInstance";
// import { useAuthStore } from "../store/sign-in.store"; // import useAuthStore here

// export interface ISubscriptionStor {
//   subscriptionPlan: ETier;
//   setTier: (subscriptionPlan: ETier) => void;
//   handleSubscriptionUpdate: (subscriptionPlan: ETier, et: string) => void;
// }

// export const useSubscriptionStor = create<ISubscriptionStor>((set) => ({
//   subscriptionPlan: ETier.FREE,
//   setTier: (subscriptionPlan: ETier) => set({ subscriptionPlan }),
//   handleSubscriptionUpdate: async (
//     subscriptionPlan: ETier,
//     accessToken: string
//   ) => {
//     set({ subscriptionPlan: subscriptionPlan });
//     try {
//       console.log(accessToken, "accessToken from store");

//       if (!accessToken) {
//         console.error("Access token is missing! Please log in again.");
//         return;
//       }

//       console.log("Selected Tier:", subscriptionPlan);

//       const res = await axiosInstance.patch(
//         `/auth/update-company`,
//         { subscriptionPlan },
//         {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         }
//       );

//       console.log("Subscription updated:", res.data);
//     } catch (e) {
//       console.log("Error updating subscription:", e);
//     }
//   },
// }));

import { create } from "zustand";
import { ETier } from "../enums/Industries";
import { axiosInstance } from "../libs/axiosInstance";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

export interface ISubscriptionStor {
  subscriptionPlan: ETier;
  activeSubscription: ETier;
  axiosError: string | null;
  verificationStatus: { resStatus: number; message: string } | null;
  setVerificationStatus: (status: {
    resStatus: number;
    message: string;
  }) => void;
  setActiveSubscription: (subscriptionPlan: ETier) => void;
  setTier: (subscriptionPlan: ETier) => void;
  handleSubscriptionUpdate: (subscriptionPlan: ETier, et: string) => void;
}

interface ErrorResponse {
  message: string;
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

export const useSubscriptionStor = create<ISubscriptionStor>((set) => ({
  subscriptionPlan: ETier.FREE,
  activeSubscription: ETier.FREE,
  axiosError: null,

  verificationStatus: null,
  setVerificationStatus: (status) =>
    set(() => ({ verificationStatus: status })),
  setTier: (subscriptionPlan: ETier) => set({ subscriptionPlan }),

  setActiveSubscription: (subscriptionPlan: ETier) =>
    set({ activeSubscription: subscriptionPlan }),

  handleSubscriptionUpdate: async (
    subscriptionPlan: ETier,
    accessToken: string
  ) => {
    set({ subscriptionPlan });
    try {
      if (!accessToken) {
        return;
      }

      const res = await axiosInstance.patch(
        `/auth/update-company`,
        { subscriptionPlan },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      // set({
      //   verificationStatus: { resStatus: res.status, message: "Subscription updated successfully!" },
      // });

      if (res.status >= 200 && res.status <= 204) {
        set({
          verificationStatus: {
            resStatus: res.status,
            message: "Subscription updated successfully!",
          },
        });
      }
    } catch (e) {
      const errorMessage = handleApiError(e as AxiosError<ErrorResponse>);
      set({ axiosError: errorMessage });
    }
  },
}));
