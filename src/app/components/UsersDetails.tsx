"use client";
import { useEffect } from "react";
import { useAuthStore } from "../store/sign-in.store";
import { useUtilities } from "../store/utilities.store";
import { MoveLeft, X } from "lucide-react";
import { useDetailsPageStore } from "../store/details.store";
import Pagination from "./Pagination";
import Link from "next/link";

const UsersDetails = () => {
  const {
    getAllUsers,
    allUsers,
    usersPage,
    usersTake,
    setUsersPage,
    usersLength,
  } = useUtilities();
  const { initialize, accessToken } = useAuthStore();
  const { deleteFileUser } = useDetailsPageStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (accessToken) {
      getAllUsers();
    }
  }, [accessToken, getAllUsers, usersPage, usersTake]);

  const submit = async (id: string) => {
    try {
      await deleteFileUser(id);
    } catch (e) {
      console.log(e);
    }
  };

  const handlePageChange = (newPage: number) => {
    setUsersPage(newPage);
  };

  return (
    <div className="flex flex-1 min-h-screen border-[3px] border-[#3A5B22] rounded-lg p-6 flex-col gap-6 relative">
      <Link href={"/"}>
        <MoveLeft className="text-[#3A5B22]" />
      </Link>
      <div>
        <h1 className="font-bold text-2xl text-[#3A5B22]">All Users</h1>
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
                  <X onClick={() => submit(user._id)} className="w-4 h-4" />
                </div>
              </div>
            ) : null
          )
        ) : (
          <div>No users found...</div>
        )}
      </div>

      <Pagination
        currentPage={usersPage}
        onPageChange={handlePageChange}
        totalPages={Math.ceil(usersLength / usersTake)}
      />
    </div>
  );
};

export default UsersDetails;
