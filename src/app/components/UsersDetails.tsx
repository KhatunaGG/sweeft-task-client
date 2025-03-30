// "use client";

// import { useEffect } from "react";
// import { useAuthStore } from "../store/sign-in.store";
// import { useUtilities } from "../store/utilities.store";

// const UsersDetails = () => {
//   const { getAllUsers, allUsers } = useUtilities();
//   const { initialize, accessToken } = useAuthStore();
//   console.log(allUsers, "allUsers");

//   useEffect(() => {
//     initialize();
//   }, [initialize]);

//   useEffect(() => {
//     if (accessToken) {
//       getAllUsers();
//     }
//   }, [accessToken, getAllUsers]);

//   if (!accessToken) return;

//   return (
//     <div className="flex flex-1 min-h-screen  border-[3px] border-[#3A5B22] rounded-lg p-6 flex-col gap-6">
//       <div>
//         <h1 className="w-full text-3xl font-bold">All Users</h1>
//       </div>
//       <div className="w-full">
//         {allUsers.length < 1 ? (
//           <div>No files found...</div>
//         ) : (
//           allUsers.map((user) => (
//             <div key={user._id} className="w-full flex flex-col gap-6">
//               <div className="w-full  py-4 px-4 border-b border-[#e2e0e0] text-xs font-bold cursor-pointer flex flex-col gap-4 items-start justify-between rounded-lg shadow-lg">
//                 <h2>
//                   {user.firstName} {user.lastName}
//                 </h2>
//               </div>

//               <form className="w-full rounded-lg shadow-lg pt-4 pb-6 px-4 flex flex-col gap-4">

//                 <div className="w-fill ">
//                   <label
//                     htmlFor=""
//                     className="w-full h-max text-xs text-[#767575]"
//                   >
//                     Name
//                   </label>

//                   <input
//                     type="text"
//                     className="w-full outline-none border border-[#d5d0d0] rounded-lg py-1 px-2 text-base"
//                   />
//                 </div>

//                 <div className="w-fill ">
//                   <label
//                     htmlFor=""
//                     className="w-full h-max text-xs text-[#767575]"
//                   >
//                     Last Name
//                   </label>

//                   <input
//                     type="text"
//                     className="w-full outline-none border border-[#d5d0d0] rounded-lg py-1 px-2 text-base"
//                   />
//                 </div>

//                 <div className="w-fill ">
//                   <label
//                     htmlFor=""
//                     className="w-full h-max text-xs text-[#767575]"
//                   >
//                    Email
//                   </label>

//                   <input
//                     type="text"
//                     className="w-full outline-none border border-[#d5d0d0] rounded-lg py-1 px-2 text-base"
//                   />
//                 </div>

//                 <button type="submit" className="w-full rounded-lg bg-[#3A5B22] py-2 text-lg text-white">Submit</button>

//               </form>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default UsersDetails;

"use client";

import { useEffect } from "react";
import { useAuthStore } from "../store/sign-in.store";
import { useUtilities } from "../store/utilities.store";
import UserUpdateForm from "./UserUpdateForm";

const UsersDetails = () => {
  const { getAllUsers, allUsers } = useUtilities();
  const { initialize, accessToken } = useAuthStore();
  console.log(allUsers, "allUsers");

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (accessToken) {
      getAllUsers();
    }
  }, [accessToken, getAllUsers]);

  if (!accessToken) return;

  return (
    <div className="flex flex-1 min-h-screen  border-[3px] border-[#3A5B22] rounded-lg p-6 flex-col gap-6">
      <div>
        <h1 className="w-full text-3xl font-bold">All Users</h1>
      </div>
      <div className="w-full">
        {allUsers.length < 1 ? (
          <div>No files found...</div>
        ) : (
          allUsers.map((user) => (
            <div key={user._id} className="w-full flex flex-col gap-6">
              <div className="w-full  py-4 px-4 border-b border-[#e2e0e0] text-xs font-bold cursor-pointer flex flex-col gap-4 items-start justify-between rounded-lg shadow-lg">
                <h2>
                  {user.firstName} {user.lastName}
                </h2>
              </div>
              <UserUpdateForm user={user} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UsersDetails;
