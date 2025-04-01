"use client";
import { useEffect } from "react";
import { tierContext } from "../data/data";
import { useAuthStore } from "../store/sign-in.store";
import { useSubscriptionStor } from "../store/subscription.store";
import { ETier } from "../enums/Industries";
import useToken from "../hooks/use-token";

const SubscriptionTier = () => {
  const { handleSubscriptionUpdate } = useSubscriptionStor();
  const initialize = useAuthStore((state) => state.initialize);
  const accessToken = useAuthStore((state) => state.accessToken);
  const { activeSubscription, setActiveSubscription } = useSubscriptionStor();
  const { company } = useToken();

  useEffect(() => {
    initialize();
    const subscriptionPlan = company?.subscriptionPlan || "";
    if (subscriptionPlan) {
      setActiveSubscription(subscriptionPlan as ETier);
    }
  }, [initialize, company?.subscriptionPlan, setActiveSubscription]);

  const getBackgroundColor = (item: ETier): string => {
    return activeSubscription === item ? "rgba(58, 91, 34, 0.1)" : "#fff";
  };

  const handleSelectSubscription = async (item: ETier) => {
    setActiveSubscription(item);
    await handleSubscriptionUpdate(item, accessToken ?? "");
  };

  return (
    <section className="w-full grid grid-cols-3 gap-3">
      {tierContext.map((item, i) => (
        <button
          style={{
            backgroundColor: getBackgroundColor(item.type),
          }}
          key={i}
          onClick={() => handleSelectSubscription(item.type)}
          className="border border-[#3A5B22] rounded-lg flex flex-col gap-2 items-start text-left px-4 py-4 cursor-pointer"
        >
          <h2 className="font-bold text-[#3A5B22]">{item.type}</h2>
          <p className="text-[#9b9494] text-xs">{item.text}</p>
        </button>
      ))}
    </section>
  );
};

export default SubscriptionTier;
