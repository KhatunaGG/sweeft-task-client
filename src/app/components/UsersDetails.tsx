"use client";
import { useEffect } from "react";
import { useAuthStore } from "../store/sign-in.store";
import { useUtilities } from "../store/utilities.store";
import UserUpdateForm from "./UserUpdateForm";
import { X } from "lucide-react";
import { useDetailsPageStore } from "../store/details.store";

const UsersDetails = () => {
  const { getAllUsers, allUsers } = useUtilities();
  const { initialize, accessToken } = useAuthStore();
  const { deleteFileUser } = useDetailsPageStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (accessToken) {
      getAllUsers();
    }
  }, [accessToken, getAllUsers]);

  const submit = async (id: string) => {
    try {
      await deleteFileUser(id);
    } catch (e) {
      console.log(e);
    }
  };

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
                    // onClick={() => deleteFileUser(user._id)}
                    onClick={() => submit(user._id)}
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
