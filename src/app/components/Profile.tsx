import React from "react";
import UploadFiles from "./UploadFiles";
import AddUser from "./AddUser";
import ChangePassword from "./ChangePassword";

const Profile = () => {
  return (
    <section
      style={{
        backgroundColor: "rgba(58, 91, 34, 0.1)",
      }}
      className="w-full border border-[#3A5B22] rounded-lg px-[80px] py-4 flex items-start justify-between "
    >
      <ChangePassword />
      <AddUser />
      <UploadFiles />
    </section>
  );
};

export default Profile;
