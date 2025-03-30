// "use client";
// import { useEffect } from "react";
// import { useUtilities } from "../store/utilities.store";
// import { useAuthStore } from "../store/sign-in.store";
// import { Pencil, X } from "lucide-react";
// import { axiosInstance } from "../libs/axiosInstance";
// import { toast } from "react-toastify";
// import { UseFilePermissionsStore } from "../store/file-permissions.store";

// const FilesDetails = () => {
//   const { allFiles, getAllFiles } = useUtilities();
//   const { accessToken, initialize } = useAuthStore();
//   const { open, setOpen } = UseFilePermissionsStore();

//   useEffect(() => {
//     initialize();
//   }, [initialize]);

//   useEffect(() => {
//     if (accessToken) {
//       getAllFiles();
//     }
//   }, [accessToken, getAllFiles]);

//   const deleteFile = async (id: string) => {
//     if (!accessToken) return;
//     try {
//       const res = await axiosInstance.delete(`file/${id}`, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });

//       if (res.status >= 200 && res.status <= 204) {
//         toast.success("File deleted successfully");
//         getAllFiles();
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   if (!accessToken) return null;

//   // Ensure allFiles is an array (default to empty array if undefined or null)
//   const files = Array.isArray(allFiles) ? allFiles : [];

//   return (
//     <div className="bg-white flex flex-col flex-1 min-h-screen p-6 border-[3px] border-[#3A5B22] rounded-lg gap-6">
//       <div></div>
//       <div>
//         <h1 className="font-bold text-2xl text-[#3A5B22]">All files</h1>
//       </div>

//       <div className="w-full flex flex-col items-start">
//         {files.length === 0 ? (
//           <div>No files found...</div>
//         ) : (
//           files.map((file, i) => (
//             <div key={i} className="w-full flex flex-col gap-6">
//               <div className="w-full py-3 px-1 border-b border-[#e2e0e0] text-xs font-bold cursor-pointer flex items-center justify-between">
//                 {file.fileName}
//                 <div className="flex items-center gap-6">
//                   <X onClick={() => deleteFile(file._id)} className="w-4 h-4" />
//                   <Pencil className="w-3 h-5" />
//                 </div>

//                 <label
//                   key={i}
//                   className="w-full flex items-center justify-center gap-4 bg-red-300"
//                 >
//                   <input
//                     // value={user._id}
//                     type="checkbox"
//                     name=""
//                     id=""
//                   />
//                   <p className="w-full text-xs">www</p>
//                 </label>

//               </div>

//               <div className="w-full border-t border-[#e2e0e0] hidden">
//                 {/* <UserPermissions /> */}

//                 <div className="relative">
//                   <label
//                     htmlFor="userPermissions"
//                     className="text-xs text-[#9b9494] w-full h-max "
//                   >
//                     Select Users to Share with (optional)
//                     <div className="w-full h-max rounded-lg relative">
//                       <input
//                         type="text"
//                         className="w-full border border-[#dddada] rounded-lg py-2.5 outline-none px-4 text-xs "
//                         readOnly
//                       />
//                       <div
//                       >
//                       </div>
//                     </div>
//                   </label>

//                   <div
//                     id="userPermissions"
//                     className={` w-full border border-[#dddada] rounded-lg py-2.5 outline-none px-4 text-xs max-h-[100px] flex overflow-y-scroll absolute -bottom-[50px] left-0 right-0 z-10 shadow-2xl bg-white flex-col gap-2`}
//                   >
//                          <label
//                           key={i}
//                           className="w-full flex items-center justify-center gap-4"
//                         >
//                           <input
//                             type="checkbox"
//                             name=""
//                             id=""
//                           />
//                           <p className="w-full text-xs">www</p>
//                         </label>
//                      </div>
//                 </div>
//               </div>
//             </div>
//           )

//   )
// };

// export default FilesDetails;

"use client";
import { useEffect, useState } from "react";
import { useUtilities } from "../store/utilities.store";
import { useAuthStore } from "../store/sign-in.store";
import { Pencil, X } from "lucide-react";
import { axiosInstance } from "../libs/axiosInstance";
import { toast } from "react-toastify";

export type PermissionType = {
  permissionById: string;
  permissionByEmail: string;
};

const FilesDetails = () => {
  const { allFiles, getAllFiles, allUsers, getAllUsers } = useUtilities();
  const { accessToken, initialize } = useAuthStore();
  const [selected, setSelected] = useState<string | null>(null);
  const [selectedPermission, setSelectedPermission] = useState<
    PermissionType[] | undefined
  >([]);

  console.log(selected, "selected");

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (accessToken) {
      getAllFiles();
      getAllUsers();
    }
  }, [accessToken, getAllFiles, getAllUsers]);

  const deleteFile = async (id: string) => {
    if (!accessToken) return;
    try {
      const res = await axiosInstance.delete(`file/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res.status >= 200 && res.status <= 204) {
        toast.success("File deleted successfully");
        getAllFiles();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getSelectedPermission = (id: string) => {
    const active = allFiles.find((item) => item._id === id);
    if (active && active.userPermissions) {
      const parsedPermissions = active.userPermissions
        .map((permission: string) => {
          try {
            const parsed =
              typeof permission === "string"
                ? JSON.parse(permission)
                : permission;
            return parsed && parsed.length > 0 ? parsed : null;
          } catch (error) {
            console.error("Error parsing user permission", error);
            return null;
          }
        })
        .filter((permission) => permission !== null);

      setSelectedPermission(parsedPermissions.flat() as PermissionType[]);
    }
  };

  console.log(selectedPermission, "selectedPermission");

  useEffect(() => {
    if (selected) {
      getSelectedPermission(selected);
    }
  }, [selected]);

  const handleCheckboxChange = (permissionId: string, checked: boolean) => {
    console.log(`Permission ID: ${permissionId} checked: ${checked}`);
    updatePermissions(permissionId, checked);
  };

  const handelShow = (id: string) => {
    setSelected((prev) => (prev === id ? null : id));
    getSelectedPermission(id);
  };

  if (!accessToken) return null;

  const updatePermissions = async (permissionId: string, checked: boolean) => {
    try {
      // let updatedPermissions = [...selectedPermission];
      const updatedPermissions = [...(selectedPermission ?? [])];
      if (checked) {
        const user = allUsers.find((user) => user._id === permissionId);
        if (
          user &&
          !updatedPermissions.some(
            (permission) => permission.permissionById === permissionId
          )
        ) {
          updatedPermissions.push({
            permissionById: permissionId,
            permissionByEmail: user.userEmail,
          });
        }
      } else {
        const index = updatedPermissions.findIndex(
          (permission) => permission.permissionById === permissionId
        );
        if (index !== -1) {
          updatedPermissions.splice(index, 1);
        }
      }
      setSelectedPermission(updatedPermissions);
      const res = await axiosInstance.patch(
        `/file/${selected}`,
        {
          userPermissions: updatedPermissions,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (res.status >= 200 && res.status <= 204) {
        getAllFiles();
      }
      console.log(res.data, "res.data");
    } catch (e) {
      console.log(e);
    }
  };

  // const files = Array.isArray(allFiles) ? allFiles : [];
  if (!accessToken) return;

  return (
    <div className="bg-white flex flex-col flex-1 min-h-screen p-6 border-[3px] border-[#3A5B22] rounded-lg gap-6">
      <div>
        <h1 className="font-bold text-2xl text-[#3A5B22]">All files</h1>
      </div>

      <div className="w-full flex flex-col items-start">
        {allFiles.length === 0 ? (
          <div>No files found...</div>
        ) : (
          allFiles.map((file, i) => (
            <div key={i} className="w-full flex flex-col  ">
              <div className="w-full py-3 px-1 border-b border-[#e2e0e0] text-xs font-bold cursor-pointer flex flex-col gap-4 items-center justify-between ">
                <div className="w-full flex items-center justify-between gap-6">
                  <h2> {file.fileName}</h2>
                  <div className="flex items-center gap-4">
                    <X
                      onClick={() => deleteFile(file._id)}
                      className="w-4 h-4"
                    />
                    <Pencil
                      onClick={() => handelShow(file._id)}
                      className="w-3 h-5"
                    />
                  </div>
                </div>

                {/* <UserPermissions /> */}
                <div
                  className={`USERPERMISSIONS ${
                    selected === file._id ? "flex" : "hidden"
                  } w-full border-t border-[#e2e0e0] shadow-xl rounded-sm p-4`}
                >
                  <div className="w-full flex flex-col gap-2">
                    <label
                      htmlFor="userPermissions"
                      className="text-xs text-[#9b9494] w-full h-max "
                    >
                      Select Users to Share with (optional)
                      <div className="w-full h-max rounded-lg relative">
                        <input
                          type="text"
                          className="w-full border border-[#dddada] rounded-lg py-2.5 outline-none px-4 text-xs flex flex-col gap-1"
                          value={selectedPermission
                            ?.map((perm) => perm.permissionByEmail)
                            .join(", ")}
                          readOnly
                        />
                      </div>
                    </label>

                    <div
                      id="userPermissions"
                      className={` w-full border border-[#dddada] rounded-lg py-2.5 outline-none px-4 text-xs max-h-[100px] flex overflow-y-scroll  shadow-2xl bg-white flex-col gap-2`}
                    >
                      {allUsers?.map((user) => {
                        const hasPermission = selectedPermission?.some(
                          (permission) => permission.permissionById === user._id
                        );
                        return (
                          <label
                            key={user._id}
                            className="w-full flex items-center justify-center gap-4"
                          >
                            <input
                              type="checkbox"
                              name={user._id}
                              id={user._id}
                              checked={hasPermission}
                              onChange={(e) =>
                                handleCheckboxChange(user._id, e.target.checked)
                              }
                            />
                            <p className="w-full text-xs">{user.userEmail}</p>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FilesDetails;
