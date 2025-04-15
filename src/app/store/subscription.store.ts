import { create } from "zustand";
import { ETier } from "../enums/Industries";
import { axiosInstance } from "../libs/axiosInstance";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { ErrorResponse, ISubscriptionStor } from "../interface";

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

export const useSubscriptionStore = create<ISubscriptionStor>((set) => ({
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

      if (res.status >= 200 && res.status <= 204) {
        set({
          verificationStatus: {
            resStatus: res.status,
            message: "Subscription updated successfully!",
          },
          activeSubscription: subscriptionPlan,
        });
      }
    } catch (e) {
      const errorMessage = handleApiError(e as AxiosError<ErrorResponse>);
      set({ axiosError: errorMessage });
    }
  },
}));
