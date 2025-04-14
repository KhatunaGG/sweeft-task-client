import React from "react";
import UsersDetails from "./UsersDetails";
import FilesDetails from "./FilesDetails";

const Details = () => {
  return (
    <div className="w-full bg-[#3A5B221A] min-h-screen flex items-start justify-center p-2">
      <FilesDetails />
      <UsersDetails />
    </div>
  );
};

export default Details;
