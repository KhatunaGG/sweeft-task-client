import React from "react";

const UploadFiles = () => {
  return (
    <div className="UPLOAD-FILE flex flex-col gap-4 w-[33%]  ">
      <div className="fw-full flex items-center justify-between bg-white rounded-lg shadow-xl px-4  py-4">
        <h2 className="text-xl text-[#333] font-bold">Upload File</h2>
        <p className="text-sm text-[#3A5B22] font-bold">Files(11)</p>
      </div>

      <form className="bg-white w-full px-4 pb-6 pt-4 rounded-lg flex flex-col gap-6 shadow-xl hidden">
        <div>
          <label className="w-full text-[#9b9494] text-xs ">Password</label>
          <input
            type="text"
            className="w-full border border-[#dddada] rounded-lg py-2 outline-none px-4"
          />
        </div>

        <div>
          <label className="w-full text-[#9b9494] text-xs ">New Password</label>
          <input
            type="text"
            className="w-full border border-[#dddada] rounded-lg py-2 outline-none px-4"
          />
        </div>

        <button className="w-full bg-[#3A5B22] rounded-lg py-2 text-white font=bold">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UploadFiles;
