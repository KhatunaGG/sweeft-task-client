"use client"
import { useEffect } from "react";
import { useUtilities } from "../store/utilities.store";
import { useAuthStore } from "../store/sign-in.store";
import { Pencil, X } from "lucide-react";
import { axiosInstance } from "../libs/axiosInstance";
import { toast } from "react-toastify";

const FilesDetails = () => {
  const { allFiles, getAllFiles } = useUtilities();
  const { accessToken, initialize } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (accessToken) {
      getAllFiles();
    }
  }, [accessToken, getAllFiles]);

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

  if (!accessToken) return null;

  // Ensure allFiles is an array (default to empty array if undefined or null)
  const files = Array.isArray(allFiles) ? allFiles : [];

  return (
    <div className="bg-white flex flex-col flex-1 min-h-screen p-6 border-[3px] border-[#3A5B22] rounded-lg gap-6">
      <div></div>
      <div>
        <h1 className="font-bold text-2xl text-[#3A5B22]">All files</h1>
      </div>

      <div className="w-full flex flex-col items-start">
        {files.length === 0 ? (
          <div>No files found...</div>
        ) : (
          files.map((file, i) => (
            <div key={i} className="w-full flex flex-col gap-6">
              <div className="w-full py-3 px-1 border-b border-[#e2e0e0] text-xs font-bold cursor-pointer flex items-center justify-between">
                {file.fileName}
                <div className="flex items-center gap-6">
                  <X
                    onClick={() => deleteFile(file._id)}
                    className="w-4 h-4"
                  />
                  <Pencil className="w-3 h-5" />
                </div>
              </div>

              <div className="w-full border-t border-[#e2e0e0] hidden">
                {/* <UserPermissions /> */}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FilesDetails;
