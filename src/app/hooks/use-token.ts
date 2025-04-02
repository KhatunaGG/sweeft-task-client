import { deleteCookie, getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { axiosInstance } from "../libs/axiosInstance";

export interface IUser {
  _id: string;
  userEmail: string;
  companyId: string;
  isVerified: boolean;
  validationLink: string | null;
  validationLinkValidateDate: string | null;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  firstName?: string;
  lastName?: string;
}

export interface ICompany {
  _id: string;
  name: string;
  email: string;
  country: string;
  industry: string;
  isVerified: boolean;
  validationLink: string | null;
  validationLinkValidateDate: string | null;
  role: string;
  subscriptionPlan: string;
  uploadedFiles: string[];
  user: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const useAccessToken = () => {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [company, setCompany] = useState<ICompany | null>(null);
  const [user, setUser] = useState<IUser | null>(null);
  // const [currentUser, setCurrentUser] = useState<IUserOrCompany | null>(null);

  const getCurranUser = async (accessToken: string | undefined) => {
    try {
      const res = await axiosInstance.get("/auth/current-user", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setUser(res.data.user);
      setCompany(res.data.company);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    deleteCookie("accessToken");
    setAccessToken(null);
    setCompany(null);
    router.push("/sign-up");
  };

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getCookie("accessToken");
      if (!token) {
        // router.push("/sign-up");
        router.push("/sign-in");
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

  return { accessToken, company, logout, getCurranUser, user };
};

export default useAccessToken;
