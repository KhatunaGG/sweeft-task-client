"use client";
import Image from "next/image";
import Info from "./Info";
import SubscriptionTier from "./SubscriptionTier";
import Profile from "./Profile";
import { useEffect } from "react";
import { useAuthStore } from "../store/sign-in.store";

const Dashboard = () => {
  const { accessToken, initialize, company } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (!accessToken) {
    return null;
  }

  return (
    <section className="w-full min-h-screen flex  items-start justify-center">
      <div className=" w-[25%]">
        <div className="relative max-w-[535px] min-h-screen overflow-hidden">
          <div className="absolute top-[50px] w-full  z-10  flex flex-col items-center justify-center gap-2">
            <h1 className="font-bold text-2xl text-white">
              {company?.name?.toUpperCase() || ""}
            </h1>
            <h2 className="text-white">{company?.email}</h2>
            <h2 className="text-white">
              <span className="text-xs">Industry: </span>
              {company?.industry}
            </h2>
            <h2 className="text-white">{company?.country}</h2>
          </div>
          <div className="absolute inset-0  w-full h-full bg-gradient-to-t from-black-100 to-transparent -z-20 opacity-80 backdrop-blur-xl rounded-r-4xl"></div>
          <Image
            src="/assets/img.png"
            alt="Image description"
            fill
            priority
            sizes="(max-width: 600px) 100vw, 50vw"
            className=" rounded-r-4xl -z-30"
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
