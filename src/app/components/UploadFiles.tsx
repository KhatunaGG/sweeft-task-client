"use client";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../store/sign-in.store";
import { useUtilities } from "../store/utilities.store";
import UserPermissions from "./UserPermissions";
import { UseFilePermissionsStore } from "../store/file-permissions.store";

const UploadFiles = () => {
  const { accessToken } = useAuthStore();
  const { allUsers, filesLength, getAllFiles } = useUtilities();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const {
    open,
    fileError,
    checked,
    setOpen,
    setChecked,
    uploadFile,
    handleFileChange,
    handleUserSelection,
    initializeState,
    resStatus,
  } = UseFilePermissionsStore();


  useEffect(() => {
    initializeState();
    getAllFiles();
  }, [accessToken]);

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async () => {
    if (!accessToken) {
      return;
    }
    try {
      await uploadFile();
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      if(resStatus && resStatus  >= 200 && resStatus <= 204) {
        setOpen(false)
      }
    } catch (e) {
      console.log(e);
    }
  };
  
  return (
    <div className="UPLOAD-FILE flex flex-col gap-4 w-[33%]">
      <button
        onClick={() => setOpen(!open)}
        type="button"
        className="fw-full flex items-center justify-between bg-white rounded-lg shadow-xl px-4 py-4"
      >
        <h2 className="text-xl text-[#333] font-bold">Upload File</h2>
        <p className="text-sm text-[#3A5B22] font-bold">Files({filesLength})</p>
      </button>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${
          open ? "flex" : "hidden"
        } bg-white w-full px-4 pb-6 pt-4 rounded-lg flex-col gap-6 shadow-xl`}
      >
        <div>
          <label className="w-full text-[#9b9494] text-xs" htmlFor="fileInput">
            Choose File
          </label>
          <input
            ref={fileInputRef}
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            className="w-full border border-[#dddada] rounded-lg py-2.5 outline-none px-4 text-xs"
          />
          {fileError && (
            <p className="text-red-500 text-xs mt-1">
              Please select a file to upload.
            </p>
          )}
        </div>
        <UserPermissions
          allUsers={allUsers}
          handleUserSelection={handleUserSelection}
          setChecked={setChecked}
          checked={checked}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#3A5B22] rounded-lg py-2 text-white font-bold"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default UploadFiles;
