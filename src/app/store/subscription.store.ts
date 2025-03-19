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

export interface ISubscriptionStor {
  subscriptionPlan: ETier;
  activeSubscription: ETier;
  setActiveSubscription: (subscriptionPlan: ETier) => void;
  setTier: (subscriptionPlan: ETier) => void;
  handleSubscriptionUpdate: (subscriptionPlan: ETier, et: string) => void;
}

export const useSubscriptionStor = create<ISubscriptionStor>((set) => ({
  subscriptionPlan: ETier.FREE,
  activeSubscription: ETier.FREE,

  setTier: (subscriptionPlan: ETier) => set({ subscriptionPlan }),

  setActiveSubscription: (subscriptionPlan: ETier) =>
    set({ activeSubscription: subscriptionPlan }),

  handleSubscriptionUpdate: async (
    subscriptionPlan: ETier,
    accessToken: string
  ) => {
    set({ subscriptionPlan });
    try {
      console.log(accessToken, "accessToken from store");

      if (!accessToken) {
        console.error("Access token is missing! Please log in again.");
        return;
      }

      console.log("Selected Tier:", subscriptionPlan);

      const res = await axiosInstance.patch(
        `/auth/update-company`,
        { subscriptionPlan },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      console.log("Subscription updated:", res.data);
    } catch (e) {
      console.log("Error updating subscription:", e);
    }
  },
}));
