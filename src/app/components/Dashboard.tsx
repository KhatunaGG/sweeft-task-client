"use client";
import { useEffect } from "react";
import { useAuthStore } from "../store/sign-in.store";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";

const Dashboard = () => {
  const router = useRouter();
  const { accessToken, initialize, setAccessToken } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      // await initialize(); 
      const tokenFromCookies = await getCookie("accessToken") as string;

      if (!tokenFromCookies) {
        router.push("/sign-up"); 
      } else {
        setAccessToken(tokenFromCookies); 
      }
    };

    checkAuth();
  }, [initialize, setAccessToken, router]); 

  if (!accessToken) {
    return null; 
  }

  return (
    <div className="w-full min-h-screen bg-green-400">Dashboard hiiiiiiiiii</div>
  );
};

export default Dashboard;
