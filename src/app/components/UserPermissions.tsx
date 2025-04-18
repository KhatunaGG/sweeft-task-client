"use client";
import { ChevronDown, X } from "lucide-react";
import { UseFilePermissionsStore } from "../store/file-permissions.store";
import { UserPermissionsPropsType } from "../interface";

const UserPermissions = ({
  allUsers,
  handleUserSelection,
  checked,
  setChecked,
}: UserPermissionsPropsType) => {
  const { showUsers, setShowUsers } = UseFilePermissionsStore();
  const selectedUsers = UseFilePermissionsStore.getState().selectedUsers;

  const inputValue =
    selectedUsers.length < 1
      ? "All"
      : checked
      ? selectedUsers.find((user) => user.permissionById === checked)
          ?.permissionByEmail
      : "";

  return (
    <div className="relative">
      <label
        htmlFor="userPermissions"
        className="text-xs text-[#9b9494] w-full h-max "
      >
        Select Users to Share with (optional)
        <div className="w-full h-max rounded-lg relative">
          <input
            value={inputValue}
            type="text"
            className="w-full border border-[#dddada] rounded-lg py-2.5 outline-none px-4 text-xs flex flex-col gap-1"
            readOnly
          />
          <div onClick={() => setShowUsers(!showUsers)}>
            {showUsers ? (
              <X className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10" />
            ) : (
              <ChevronDown className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10" />
            )}
          </div>
        </div>
      </label>

      <div
        id="userPermissions"
        className={` ${
          showUsers ? "flex" : "hidden"
        } w-full border border-[#dddada] rounded-lg py-2.5 outline-none px-4 text-xs max-h-[100px] overflow-y-scroll absolute -bottom-[50px] left-0 right-0 z-10 shadow-2xl bg-white flex-col gap-2`}
      >
        {allUsers.length > 0 ? (
          allUsers.map((user, i) => (
            <label
              key={i}
              className="w-full flex items-center justify-center gap-4"
            >
              <input
                checked={checked === user._id}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  if (isChecked) {
                    setChecked(user._id);
                  } else {
                    setChecked(null);
                  }
                  handleUserSelection(user._id, user.userEmail, isChecked);
                }}
                value={user._id}
                type="checkbox"
                name=""
                id=""
              />
              <p className="w-full text-xs">{user.userEmail}</p>
            </label>
          ))
        ) : (
          <p>No users available</p>
        )}
      </div>
    </div>
  );
};

export default UserPermissions;
