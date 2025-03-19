// import React from "react";

// const SubscriptionTier = () => {
//   return (
//     <section className=" w-full  grid grid-cols-3 gap-3">
//       <button className="border border-[#3A5B22] rounded-lg flex flex-col gap-2 items-start text-left px-4 py-4 cursor-pointer">
//         <h2 className="font-bold text-[#3A5B22]">Free</h2>
//         <p className="text-[#9b9494] text-sm">
//           The Free tier allows users to have a single account with limited
//           access to the platform&apos;s features. Users can upload up to 10
//           files per month without any associated cost.
//         </p>
//       </button>

//       <button className="border border-[#3A5B22] rounded-lg flex flex-col gap-2 items-start text-left px-4 py-4 cursor-pointer">
//         <h2 className="font-bold text-[#3A5B22]">Basic</h2>
//         <p className="text-[#9b9494] text-sm">
//           The Basic tier allows up to 10 users, with the ability to upload up to
//           100 files per month. If additional users are added beyond the 10-user
//           limit, an extra $5 will be charged per user
//         </p>
//       </button>

//       <button className="border border-[#3A5B22] rounded-lg flex flex-col gap-2 items-start text-left px-4 py-4 cursor-pointer">
//         <h2 className="font-bold text-[#3A5B22]">Premium</h2>
//         <p className="text-[#9b9494] text-sm">
//           The Premium tier offers up to 1000 file uploads per month with a fixed
//           cost of $300. It includes unlimited users. However, if more than 1000
//           files are uploaded in a month, an additional $0.50 will be charged per
//           extra file.
//         </p>
//       </button>
//     </section>
//   );
// };

// export default SubscriptionTier;

//START:
// "use client"
// import { tierContext } from "../data/data";

// const SubscriptionTier = () => {
//   return (
//     <section className=" w-full  grid grid-cols-3 gap-3">
//       {tierContext.map((item, i) => (
//         <button
//           key={i}
//           className="border border-[#3A5B22] rounded-lg flex flex-col gap-2 items-start text-left px-4 py-4 cursor-pointer"
//         >
//           <h2 className="font-bold text-[#3A5B22]">{item.type}</h2>
//           <p className="text-[#9b9494] text-xs">{item.text}</p>
//         </button>
//       ))}
//     </section>
//   );
// };

// export default SubscriptionTier;

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
  const { activeSubscription, setActiveSubscription  } =
    useSubscriptionStor();
  const { company } = useToken();

  // useEffect(() => {
  //   initialize();
  //   setActiveSubscription(company?.subscriptionPlan as ETier);
  // }, [accessToken]);

  useEffect(() => {
    initialize();
    if (company?.subscriptionPlan) {
      setActiveSubscription(company.subscriptionPlan as ETier);
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
          // onClick={() => {
          //   setActiveSubscription(item.type);
          //   handleSubscriptionUpdate(item.type, accessToken ?? "");
          // }}
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
