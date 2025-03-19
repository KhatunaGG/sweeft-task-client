// "use client";

// import useToken from "../hooks/use-token";

// const Info = () => {
//   const { company } = useToken();
//   return (
//     <section className="INFO w-full px-2 py-2 grid grid-cols-5 border-[2px] border-[#3A5B22] rounded-lg gap-2">
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-[#9b9494] text-xs ">Email</p>
//           <p className="text-[#333333] text-sm font-bold">{company?.email}</p>
//         </div>
//         <div className="h-full w-[2px] bg-[#3A5B22]"></div>
//       </div>

//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-[#9b9494] text-xs ">Subscription</p>
//           <p className="text-[#333333] text-sm font-bold">Free</p>
//         </div>
//         <div className="h-full w-[2px] bg-[#3A5B22]"></div>
//       </div>

//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-[#9b9494] text-xs ">users</p>
//           <p className="text-[#333333] text-sm font-bold">11</p>
//         </div>
//         <div className="h-full w-[2px] bg-[#3A5B22]"></div>
//       </div>

//       <div className="flex items-center justify-between">
//         <div>
//           <div className="text-[#9b9494] text-xs ">Files</div>
//           <p className="text-[#333333] text-sm font-bold">11</p>
//         </div>
//         <div className="h-full w-[2px] bg-[#3A5B22]"></div>
//       </div>

//       <button className=" text-sm font-bold bg-[#3A5B22] rounded-lg text-white py-1 flex items-center justify-center cursor-pointer">
//         Log out
//       </button>
//     </section>
//   );
// };

// export default Info;



"use client";

import useToken from "../hooks/use-token";

const Info = () => {
  const { company } = useToken();

  return (
    <section className="INFO w-full px-2 py-2 grid grid-cols-4 border-[2px] border-[#3A5B22] rounded-lg gap-2">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[#9b9494] text-xs ">Company Email</p>
          <p className="text-[#333333] text-sm font-bold">{company?.email}</p>
        </div>
        <div className="h-full w-[2px] bg-[#3A5B22]"></div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-[#9b9494] text-xs ">User</p>
          <p className="text-[#333333] text-sm font-bold">Ann</p>
        </div>
        <div className="h-full w-[2px] bg-[#3A5B22]"></div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-[#9b9494] text-xs ">User Email</p>
          <p className="text-[#333333] text-sm font-bold">ann@gmail.com</p>
        </div>
        <div className="h-full w-[2px] bg-[#3A5B22]"></div>
      </div>

      {/* <div className="flex items-center justify-between">
        <div>
          <div className="text-[#9b9494] text-xs ">Files</div>
          <p className="text-[#333333] text-sm font-bold">11</p>
        </div>
        <div className="h-full w-[2px] bg-[#3A5B22]"></div>
      </div> */}

      <button className=" text-sm font-bold bg-[#3A5B22] rounded-lg text-white py-1 flex items-center justify-center cursor-pointer">
        Log out
      </button>
    </section>
  );
};

export default Info;
