"use client";
import { useEffect } from "react";
import { useUtilities } from "../store/utilities.store";
import { useAuthStore } from "../store/sign-in.store";
import { Download, MoveLeft, Pencil, X } from "lucide-react";
import { useDetailsPageStore } from "../store/details.store";
import Pagination from "./Pagination";
import Link from "next/link";

export type PermissionType = {
  permissionById: string;
  permissionByEmail: string;
};

const FilesDetails = () => {
  const {
    allFiles,
    getAllFiles,
    allUsers,
    getAllUsers,
    filesPage,
    filesTake,
    setFilesPage,
    filesLength,
  } = useUtilities();
  const { accessToken, initialize } = useAuthStore();
  const {
    getSelectedPermission,
    updatePermissions,
    deleteFile,
    selectedPermission,
    selected,
    setSelected,
    handleDownload,
  } = useDetailsPageStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (accessToken) {
      getAllFiles();
      getAllUsers();
    }
  }, [accessToken, getAllFiles, getAllUsers, filesPage, filesTake]);

  useEffect(() => {
    if (selected) {
      getSelectedPermission(selected);
    }
  }, [selected, getSelectedPermission]);

  const handleCheckboxChange = (permissionId: string, checked: boolean) => {
    updatePermissions(permissionId, checked);
  };

  const handelShow = (id: string) => {
    const currentSelected = selected;
    setSelected(currentSelected === id ? null : id);
    getSelectedPermission(id);
  };

  const handlePageChange = (newPage: number) => {
    setFilesPage(newPage);
  };

  // const handleItemsPerPage = (newTake: number) => {
  //   setFilesTake(newTake);
  // };

  const safeAllFiles = Array.isArray(allFiles) ? allFiles : [];
  if (!accessToken) return null;

  return (
    <div className="bg-white flex flex-col flex-1 min-h-screen p-6 border-[3px] border-[#3A5B22] rounded-lg gap-6 relative">
      <Link href={"/"}>
        <MoveLeft className="text-[#3A5B22]" />
      </Link>
      <div>
        <h1 className="font-bold text-2xl text-[#3A5B22]">All files</h1>
      </div>

      <div className="w-full flex flex-col items-start">
        {allFiles.length === 0 ? (
          <div>No files found...</div>
        ) : (
          safeAllFiles.map((file, i) => (
            <div key={i} className="w-full flex flex-col  ">
              <div className="w-full py-3 px-1 border-b border-[#e2e0e0] text-xs font-bold cursor-pointer flex flex-col gap-4 items-center justify-between ">
                <div className="w-full flex items-center justify-between gap-8">
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
                    <Download
                      onClick={() => handleDownload(file._id)}
                      className="w-4 h-4"
                    />
                  </div>
                </div>

                {/* <UserPermissions /> */}
                <div
                  className={`${
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
                          value={
                            selectedPermission
                              ? selectedPermission
                                  .map((perm) => perm.permissionByEmail)
                                  .join(", ")
                              : ""
                          }
                          readOnly
                        />
                      </div>
                    </label>

                    <div
                      id="userPermissions"
                      className={` w-full border border-[#dddada] rounded-lg py-2.5 outline-none px-4 text-xs max-h-[100px] flex overflow-y-scroll  shadow-2xl bg-white flex-col gap-2`}
                    >
                      {Array.isArray(allUsers) && allUsers.length > 0 ? (
                        allUsers.map((user) => {
                          if (!user || !user._id) return null;
                          const hasPermission =
                            selectedPermission?.some(
                              (permission) =>
                                permission.permissionById === user._id
                            ) || false;
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
                                  handleCheckboxChange(
                                    user._id,
                                    e.target.checked
                                  )
                                }
                              />
                              <p className="w-full text-xs">{user.userEmail}</p>
                            </label>
                          );
                        })
                      ) : (
                        <div>No users available</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <Pagination
        currentPage={filesPage}
        onPageChange={handlePageChange}
        totalPages={Math.ceil(filesLength / filesTake)}
        // onItemsPerPage={handleItemsPerPage}
        // take={filesTake}
      />
    </div>
  );
};

export default FilesDetails;
