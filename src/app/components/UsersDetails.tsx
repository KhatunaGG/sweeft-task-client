"use client";
import { useEffect } from "react";
import { useAuthStore } from "../store/sign-in.store";
import { useUtilities } from "../store/utilities.store";
import UserUpdateForm from "./UserUpdateForm";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import { axiosInstance } from "../libs/axiosInstance";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const UsersDetails = () => {
  const { getAllUsers, allUsers, getAllFiles } = useUtilities();
  const {
    initialize,
    accessToken,
    setAccessToken,
    user,
    setUser,
    setCompany,
  } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (accessToken) {
      getAllUsers();
    }
  }, [accessToken, getAllUsers]);

  const deleteFileUser = async (id: string) => {
    try {
      const res = await axiosInstance.delete(`/user/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (res.status >= 200 || res.status <= 204) {
        if (user?._id === id) {
          setUser(null);
          setCompany(null);
          deleteCookie("accessToken");
          setAccessToken("");
          router.push("/sign-up");
        }
        getAllUsers();
        getAllFiles();
      }
    } catch (e) {
      console.log(e);
      if (axios.isAxiosError(e)) {
        if (e.response) {
          const message = e.response.data?.message || "An error occurred";
          toast.error(message);
        } else {
          toast.error("Network error. Please try again later.");
        }
      } else {
        toast.error("Unexpected error occurred.");
      }
    }
  };

  if (!accessToken) return;

  return (
    <div className="flex flex-1 min-h-screen border-[3px] border-[#3A5B22] rounded-lg p-6 flex-col gap-6">
      <div>
        <h1 className="w-full text-3xl font-bold">All Users</h1>
      </div>
      <div className="w-full">
        {Array.isArray(allUsers) && allUsers.length > 0 ? (
          allUsers.map((user) =>
            user ? (
              <div key={user._id} className="w-full flex flex-col gap-6">
                <div className="w-full py-4 px-4 border-b border-[#e2e0e0] text-xs font-bold cursor-pointer flex gap-4 items-start justify-between rounded-lg shadow-lg">
                  <h2>
                    {user.firstName || "First Name"}{" "}
                    {user.lastName || "Last Name"}
                  </h2>
                  <X
                    onClick={() => deleteFileUser(user._id)}
                    className="w-4 h-4"
                  />
                </div>
                {user && user?.companyId === undefined ? (
                  <UserUpdateForm user={user} />
                ) : null}
              </div>
            ) : null
          )
        ) : (
          <div>No users found...</div>
        )}
      </div>
    </div>
  );
};

export default UsersDetails;
