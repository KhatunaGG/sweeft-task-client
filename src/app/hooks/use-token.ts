import { deleteCookie, getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { axiosInstance } from "../libs/axiosInstance";


export interface ICompany {
  name: string;
  email: string;
  country: string;
  industry: string;
  isVerified: boolean;
  validationLink: string | null;
  validationLinkValidateDate: string | null;
  role: string;
  subscriptionPlan: string;
}

const useAccessToken = () => {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [company, setCompany] = useState<ICompany | null>(null);

  const getCurranUser = async (accessToken: string | undefined) => {
    try {
      const res = await axiosInstance.get("/auth/current-user", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setCompany(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    deleteCookie("accessToken");
    setAccessToken(null);
    setCompany(null);
    router.push("/");
  };

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getCookie("accessToken");
      if (!token) {
        router.push("/sign-up");
      } else {
        setAccessToken(token as string);
      }
    };

    fetchToken();
  }, [router]);

  useEffect(() => {
    if (accessToken) {
      getCurranUser(accessToken);
    }
  }, [accessToken]);

  return { accessToken, company, logout, getCurranUser };
};

export default useAccessToken;
