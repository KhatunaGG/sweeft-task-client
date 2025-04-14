"use client";
import Link from "next/link";
import { useAuthStore } from "../store/sign-in.store";

const Info = () => {
  const { company, user, logout } = useAuthStore();

  return (
    <section className="INFO w-full px-2 py-2 flex border-[2px] border-[#3A5B22] rounded-lg gap-2">
      <div className="flex w-1/2">
        <div className="flex items-center justify-between w-[25%] px-2">
          <div>
            <p className="text-[#9b9494] text-xs"> Extra Charges:</p>
            <p className="text-[#333333] text-sm font-bold">
              {`$ ${(
                (company?.extraFileCharge || 0) +
                (company?.extraUserCharge || 0) +
                (company?.premiumCharge || 0)
              ).toFixed(2)}`}
            </p>
          </div>
          <div className="h-full w-[2px] bg-[#3A5B22]"></div>
        </div>

        <div className="flex items-center justify-between w-[74%] ">
          <div className="w-full">
            <div className="flex items-center justify-start gap-4">
              <p className="text-[#9b9494] text-xs">User:</p>
              <p className="text-[#333333] text-sm font-bold">
                {user?.firstName && user?.lastName
                  ? `${user.firstName} ${user.lastName}`
                  : ""}
              </p>
            </div>

            <div className="w-full flex items-center gap-4">
              <p className="text-[#9b9494] text-xs">User Email:</p>
              <p className="text-[#333333] text-sm font-bold">
                {user?.userEmail || ""}
              </p>
            </div>
          </div>
          <div className="h-full w-[2px] bg-[#3A5B22]"></div>
        </div>
      </div>

      <div className="flex gap-2  w-1/2">
        <Link href={"/details"} className="w-full flex justify-center">
          <button className="w-full text-sm font-bold border-[3px] border-[#3A5B22] rounded-lg text-[#3A5B22] bg-[#3A5B221A] flex items-center justify-center py-2">
            files / Users
          </button>
        </Link>

        <button
          onClick={() => logout()}
          className="w-full text-sm font-bold bg-[#3A5B22] rounded-lg text-white py-2 flex items-center justify-center"
        >
          Log out
        </button>
      </div>
    </section>
  );
};

export default Info;
