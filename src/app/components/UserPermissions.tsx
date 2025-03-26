"use client";
import { Dispatch, SetStateAction } from "react";
import { IUser } from "../hooks/use-token";

export type UserPermissionsPropsType = {
  allUsers: IUser[];
  handleUserSelection: (userId: string, isChecked: boolean) => void;
  setChecked: Dispatch<SetStateAction<string | null>>;
  checked: string | null;
};

const UserPermissions = ({
  allUsers,
  handleUserSelection,
  checked,
  setChecked,
}: UserPermissionsPropsType) => {
  return (
    <div>
      <label htmlFor="userPermissions" className="text-xs text-[#9b9494]">
        Select Users to Share with (optional)
      </label>
      <div
        id="userPermissions"
        className="w-full border border-[#dddada] rounded-lg py-2.5 outline-none px-4 text-xs max-h-[100px] overflow-y-scroll"
      >
        {allUsers.length > 0 &&
          allUsers.map((user, i) => (
            <label
              key={i}
              className="w-full flex items-center justify-center gap-2"
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
                  handleUserSelection(user._id, isChecked);
                }}
                value={user._id}
                type="checkbox"
                name=""
                id=""
              />
              <p className="w-full text-xs">{user.userEmail}</p>
            </label>
          ))}
      </div>
    </div>
  );
};

export default UserPermissions;
