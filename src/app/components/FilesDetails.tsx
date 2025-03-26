"use client";
import { useEffect } from "react";
import { useUtilities } from "../store/utilities.store";
import { useAuthStore } from "../store/sign-in.store";
import { Pencil } from "lucide-react";


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

  if (!accessToken) return null;

  return (
    <div className="bg-white flex flex-col flex-1 min-h-screen p-6 border-[3px] border-[#3A5B22] rounded-lg gap-6">
      <div></div>
      <div>
        <h1 className="font-bold text-2xl text-[#3A5B22]">All files</h1>
      </div>

      <div className="w-full flex flex-col items-start">
        {allFiles.length === 0 ? (
          <div>Loading files...</div>
        ) : (
          allFiles.map((file, i) => (

            <div key={i} className="w-full flex flex-col gap-6">

              <div
   
                className="w-full py-3 px-1 border-b border-[#e2e0e0] text-xs font-bold cursor-pointer flex items-center justify-between"
              >
                {file.fileName}
                <Pencil className="w-4 h-6" />
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
