// "use client";
// import Image from "next/image";
// import { useEffect } from "react";
// import { useAuthStore } from "../store/sign-in.store";
// import { useRouter } from "next/navigation";
// import { getCookie } from "cookies-next";

// const Dashboard = () => {
//   const router = useRouter();
//   const { accessToken, initialize, setAccessToken } = useAuthStore();

//   useEffect(() => {
//     const checkAuth = async () => {
//       // await initialize();
//       const tokenFromCookies = (await getCookie("accessToken")) as string;

//       if (!tokenFromCookies) {
//         router.push("/sign-up");
//       } else {
//         setAccessToken(tokenFromCookies);
//       }
//     };

//     checkAuth();
//   }, [initialize, setAccessToken, router]);

//   if (!accessToken) {
//     return null;
//   }

//   return (
//     <div className="w-full min-h-screen flex  items-start justify-center">
//       <div className=" w-[25%]">
//         <div className="relative w-[535px] min-h-screen overflow-hidden">
//           <div className="absolute top-[50px] w-full  z-20 left-[-150px] flex items-start justify-center">
//             <h1 className="font-bold text-2xl text-white">Company</h1>
//           </div>
//           {/* <div className="w-full h-full absolute inset-0 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-10"></div> */}
//           {/* <div className="w-full h-full absolute inset-0 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-10 backdrop-blur-sm opacity-60"></div> */}
//           <div className="absolute inset-0 left-[-150px] w-full h-full bg-gradient-to-t from-gray-100 to-transparent z-10 opacity-60 backdrop-blur-xl rounded-r-4xl"></div>
//           <Image
//             src="/assets/img.png"
//             alt="Image description"
//             fill
//             priority
//             sizes="(max-width: 600px) 100vw, 50vw"
//             className="ml-[-150px] rounded-r-4xl"
//           />
//         </div>
//       </div>
//       <div className="flex-1 min-h-screen p-6 flex flex-col gap-8">
//         <div className="INFO w-full px-2 py-2 grid grid-cols-5 border-[2px] border-[#3A5B22] rounded-lg gap-2">
//           <div className="flex items-center justify-between">
//             <div className="text-[#9b9494] text-sm ">Email</div>
//             <div className="h-full w-[2px] bg-[#3A5B22]"></div>
//           </div>

//           <div className="flex items-center justify-between">
//             <div className="text-[#9b9494] text-sm ">Subscription</div>
//             <div className="h-full w-[2px] bg-[#3A5B22]"></div>
//           </div>

//           <div className="flex items-center justify-between">
//             <div className="text-[#9b9494] text-sm ">users</div>
//             <div className="h-full w-[2px] bg-[#3A5B22]"></div>
//           </div>
//           <div className="flex items-center justify-between">
//             <div className="text-[#9b9494] text-sm ">Files</div>
//             <div className="h-full w-[2px] bg-[#3A5B22]"></div>
//           </div>

//           <button className=" text-sm font-bold bg-[#3A5B22] rounded-lg text-white py-1 flex items-center justify-center cursor-pointer">Log out</button>
//         </div>

//         <div className="TIRE w-full  grid grid-cols-3 gap-3">
//           <button className="border border-[#3A5B22] rounded-lg flex flex-col gap-2 items-start text-left px-4 py-4 cursor-pointer">
//             <h2 className="font-bold text-[#3A5B22]">Free</h2>
//             <p className="text-[#9b9494] text-sm">
//               The Free tier allows users to have a single account with limited
//               access to the platform's features. Users can upload up to 10 files
//               per month without any associated cost.
//             </p>
//           </button>

//           <button className="border border-[#3A5B22] rounded-lg flex flex-col gap-2 items-start text-left px-4 py-4 cursor-pointer">
//             <h2 className="font-bold text-[#3A5B22]">Basic</h2>
//             <p className="text-[#9b9494] text-sm">
//               The Basic tier allows up to 10 users, with the ability to upload
//               up to 100 files per month. If additional users are added beyond
//               the 10-user limit, an extra $5 will be charged per user
//             </p>
//           </button>

//           <button className="border border-[#3A5B22] rounded-lg flex flex-col gap-2 items-start text-left px-4 py-4 cursor-pointer">
//             <h2 className="font-bold text-[#3A5B22]">Premium</h2>
//             <p className="text-[#9b9494] text-sm">
//               The Premium tier offers up to 1000 file uploads per month with a
//               fixed cost of $300. It includes unlimited users. However, if more
//               than 1000 files are uploaded in a month, an additional $0.50 will
//               be charged per extra file.
//             </p>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

"use client";
import Image from "next/image";
// import { useRouter } from "next/navigation";

import useToken from "../hooks/use-token";

const Dashboard = () => {
  // const router = useRouter();
  const { accessToken, company } = useToken();
  console.log(company, "company");

  if (!accessToken) {
    return null;
  }

  return (
    <div className="w-full min-h-screen flex  items-start justify-center">
      <div className=" w-[25%]">
        <div className="relative w-[535px] min-h-screen overflow-hidden">
          <div className="absolute top-[50px] w-full  z-20 left-[-150px] flex items-start justify-center">
            <h1 className="font-bold text-2xl text-white">Company</h1>
          </div>
          {/* <div className="w-full h-full absolute inset-0 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-10"></div> */}
          {/* <div className="w-full h-full absolute inset-0 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-10 backdrop-blur-sm opacity-60"></div> */}
          <div className="absolute inset-0 left-[-150px] w-full h-full bg-gradient-to-t from-gray-100 to-transparent z-10 opacity-60 backdrop-blur-xl rounded-r-4xl"></div>
          <Image
            src="/assets/img.png"
            alt="Image description"
            fill
            priority
            sizes="(max-width: 600px) 100vw, 50vw"
            className="ml-[-150px] rounded-r-4xl"
          />
        </div>
      </div>
      <div className="flex-1 min-h-screen p-6 flex flex-col gap-8">
        <div className="INFO w-full px-2 py-2 grid grid-cols-5 border-[2px] border-[#3A5B22] rounded-lg gap-2">
          <div className="flex items-center justify-between">
            <div className="text-[#9b9494] text-sm ">Email</div>
            <div className="h-full w-[2px] bg-[#3A5B22]"></div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-[#9b9494] text-sm ">Subscription</div>
            <div className="h-full w-[2px] bg-[#3A5B22]"></div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-[#9b9494] text-sm ">users</div>
            <div className="h-full w-[2px] bg-[#3A5B22]"></div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-[#9b9494] text-sm ">Files</div>
            <div className="h-full w-[2px] bg-[#3A5B22]"></div>
          </div>

          <button className=" text-sm font-bold bg-[#3A5B22] rounded-lg text-white py-1 flex items-center justify-center cursor-pointer">
            Log out
          </button>
        </div>

        <div className="TIRE w-full  grid grid-cols-3 gap-3">
          <button className="border border-[#3A5B22] rounded-lg flex flex-col gap-2 items-start text-left px-4 py-4 cursor-pointer">
            <h2 className="font-bold text-[#3A5B22]">Free</h2>
            <p className="text-[#9b9494] text-sm">
              The Free tier allows users to have a single account with limited
              access to the platform&apos;s features. Users can upload up to 10
              files per month without any associated cost.
            </p>
          </button>

          <button className="border border-[#3A5B22] rounded-lg flex flex-col gap-2 items-start text-left px-4 py-4 cursor-pointer">
            <h2 className="font-bold text-[#3A5B22]">Basic</h2>
            <p className="text-[#9b9494] text-sm">
              The Basic tier allows up to 10 users, with the ability to upload
              up to 100 files per month. If additional users are added beyond
              the 10-user limit, an extra $5 will be charged per user
            </p>
          </button>

          <button className="border border-[#3A5B22] rounded-lg flex flex-col gap-2 items-start text-left px-4 py-4 cursor-pointer">
            <h2 className="font-bold text-[#3A5B22]">Premium</h2>
            <p className="text-[#9b9494] text-sm">
              The Premium tier offers up to 1000 file uploads per month with a
              fixed cost of $300. It includes unlimited users. However, if more
              than 1000 files are uploaded in a month, an additional $0.50 will
              be charged per extra file.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
