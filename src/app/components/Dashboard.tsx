"use client";
import Image from "next/image";
// import { useRouter } from "next/navigation";

import useToken from "../hooks/use-token";
import Info from "./Info";
import SubscriptionTier from "./SubscriptionTier";
import Profile from "./Profile";

const Dashboard = () => {
  const { accessToken } = useToken();

  if (!accessToken) {
    return null;
  }

  return (
    <section className="w-full min-h-screen flex  items-start justify-center">
      <div className=" w-[25%]">
        <div className="relative w-[535px] min-h-screen overflow-hidden">
          <div className="absolute top-[50px] w-full  z-10 left-[-150px] flex items-start justify-center">
            <h1 className="font-bold text-2xl text-white">Company</h1>
          </div>
          {/* <div className="absolute inset-0 left-[-150px] w-full h-full bg-gradient-to-t from-gray-100 to-transparent z-10 opacity-60 backdrop-blur-xl rounded-r-4xl"></div> */}
          <div className="absolute inset-0 left-[-150px] w-full h-full bg-gradient-to-t from-black-100 to-transparent -z-20 opacity-80 backdrop-blur-xl rounded-r-4xl"></div>
          <Image
            src="/assets/img.png"
            alt="Image description"
            fill
            priority
            sizes="(max-width: 600px) 100vw, 50vw"
            className="ml-[-150px] rounded-r-4xl -z-30"
          />
        </div>
      </div>
      <div className="flex-1 min-h-screen p-6 flex flex-col gap-8">
        <Info />
        <SubscriptionTier />
        <Profile />
      </div>
    </section>
  );
};

export default Dashboard;
