import React from "react";

const Profile = () => {
  return (
    <section
      style={{
        backgroundColor: "rgba(58, 91, 34, 0.1)",
      }}
      className="w-full border border-[#3A5B22] rounded-lg px-[80px] py-4 flex items-start justify-between"
    >
      <form className="bg-white w-[33%] px-4 py-8 rounded-lg flex flex-col gap-6 shadow-xl">
        <h2 className="text-xl text-[#333] font-bold">Change Password</h2>

        <div className="w-full">
          <label className="w-full text-[#9b9494] text-xs ">Password</label>
          <input
            type="text"
            className="w-full border border-[#dddada] rounded-lg py-2 outline-none px-4"
          />
        </div>

        <div className="w-full">
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

      <form className="bg-white w-[33%] px-4 py-8 rounded-lg flex flex-col gap-6 shadow-xl">
        <h2 className="text-xl text-[#333] font-bold">Add User</h2>

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

      {/* <form className="bg-white w-[33%] px-4 py-8 rounded-lg flex flex-col gap-6 shadow-xl">

        <h2 className="text-xl text-[#333] font-bold">Upload File</h2>

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
      </form> */}

      <div className="flex flex-col gap-4 w-[33%]  ">
        <div className="fw-full flex items-center justify-between bg-white rounded-lg shadow-xl px-4  py-4">
          <h2 className="text-xl text-[#333] font-bold">Upload File</h2>
          <p className="text-sm text-[#3A5B22] font-bold">Files: 11</p>
        </div>

        <form className="bg-white w-full px-4 pb-6 pt-4 rounded-lg flex flex-col gap-6 shadow-xl ">
          <div>
            <label className="w-full text-[#9b9494] text-xs ">Password</label>
            <input
              type="text"
              className="w-full border border-[#dddada] rounded-lg py-2 outline-none px-4"
            />
          </div>

          <div>
            <label className="w-full text-[#9b9494] text-xs ">
              New Password
            </label>
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
    </section>
  );
};

export default Profile;
