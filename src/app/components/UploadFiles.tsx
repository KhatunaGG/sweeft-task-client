// "use client";
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "react-toastify";
// import { useAuthStore } from "../store/sign-in.store";
// import { axiosInstance } from "../libs/axiosInstance";
// import useAccessToken from "../hooks/use-token";
// import axios from "axios";
// import { IFile, useUtilities } from "../store/utilities.store";
// import UserPermissions from "./UserPermissions";

// const UploadFiles = () => {
//   const [open, setOpen] = useState(false);
//   const [file, setFile] = useState<File | undefined>(undefined);
//   const { company, user } = useAccessToken();
//   const { accessToken } = useAuthStore();
//   const [fileError, setFileError] = useState("");
//   const { allUsers, filesLength, getAllFiles } = useUtilities();
//   const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
//   const [checked, setChecked] = useState<string | null>(null);
//   const [uploadedFile, setUploadedFile] = useState<IFile | null>(null);
//   // const [filePathFromAws, setFilePathFromAws] = useState("");

//   console.log(uploadedFile, "uploadedFile");
//   useEffect(() => {
//     getAllFiles();
//   }, [accessToken]);

//   const {
//     handleSubmit,
//     formState: { isSubmitting },
//   } = useForm();

//   const handleUserSelection = async (userId: string, isChecked: boolean) => {
//     if (file) {
//       setSelectedUsers((prev) => {
//         if (isChecked) {
//           return [...prev, userId];
//         } else {
//           const newArray = [...prev];
//           const index = newArray.indexOf(userId);
//           if (index !== -1) {
//             newArray.splice(index, 1);
//           }
//           return newArray;
//         }
//       });
//     }
//   };

//   const onSubmit = async () => {
//     if (!accessToken) {
//       return;
//     }
//     if (!file) {
//       setFileError("Please select a file to upload.");
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append("file", file);
//       formData.append("fileOwnerId", user ? user._id : company?._id || "");
//       formData.append("fileName", file.name || "");
//       formData.append("userPermissions", JSON.stringify(selectedUsers));

//       const res = await axiosInstance.post("/file/upload-file", formData, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });

//       if (res.status >= 200 && res.status <= 204) {
//         setUploadedFile(res.data.uploadedFile);
//         // setFilePathFromAws(res.data.uploadedFile.filePath);

//         // setAllFiles((prevFiles) => [...prevFiles, res.data.uploadedFile]);
//         getAllFiles();
//         setOpen(false);
//         setFile(undefined);
//         setChecked(null);
//         toast.success("File uploaded successfully");
//       } else {
//         toast.error("File upload failed");
//       }
//     } catch (e) {
//       console.log(e);
//       if (axios.isAxiosError(e)) {
//         if (e.response) {
//           const message = e.response.data?.message || "An error occurred";
//           toast.error(message);
//         } else {
//           toast.error("Network error. Please try again later.");
//         }
//       } else {
//         toast.error("Unexpected error occurred.");
//       }
//     }
//   };

//   // const updatePermissions = async () => {
//   //   if (!uploadedFile?._id) {
//   //     toast.error("File not uploaded yet.");
//   //     return;
//   //   }
//   //   try {
//   //     const res = await axiosInstance.patch(
//   //       "/file/update-permissions",
//   //       {
//   //         fileId: uploadedFile._id,
//   //         userPermissions: selectedUsers,
//   //       },
//   //       {
//   //         headers: {
//   //           Authorization: `Bearer ${accessToken}`,
//   //         },
//   //       }
//   //     );
//   //     if (res.status >= 200 && res.status <= 204) {
//   //       toast.success("Permissions updated successfully.");
//   //     } else {
//   //       toast.error("Failed to update permissions.");
//   //     }
//   //   } catch (e) {
//   //     console.log(e);
//   //     if (axios.isAxiosError(e)) {
//   //       const errorMessage = e.response?.data.message || "An error occurred";
//   //       toast.error(errorMessage);
//   //       return errorMessage;
//   //     }
//   //     const unexpectedError = "An unexpected error occurred";
//   //     toast.error(unexpectedError);
//   //     return unexpectedError;
//   //   }
//   // };

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = event.target.files?.[0];
//     if (selectedFile) {
//       const fileExtension = selectedFile.name.split(".").pop()?.toLowerCase();
//       if (!fileExtension || !["csv", "xls", "xlsx"].includes(fileExtension)) {
//         toast.error("Only CSV, XLS, or XLSX files are allowed");
//         return;
//       }
//       setFile(selectedFile);
//     } else {
//       setFile(undefined);
//     }
//   };

//   return (
//     <div className="UPLOAD-FILE flex flex-col gap-4 w-[33%]">
//       <button
//         onClick={() => setOpen((prev) => !prev)}
//         type="button"
//         className="fw-full flex items-center justify-between bg-white rounded-lg shadow-xl px-4 py-4"
//       >
//         <h2 className="text-xl text-[#333] font-bold">Upload File</h2>
//         <p className="text-sm text-[#3A5B22] font-bold">Files({filesLength})</p>
//       </button>

//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className={`${
//           open ? "flex" : "hidden"
//         } bg-white w-full px-4 pb-6 pt-4 rounded-lg flex-col gap-6 shadow-xl`}
//       >
//         <div>
//           <label className="w-full text-[#9b9494] text-xs" htmlFor="fileInput">
//             Choose File
//           </label>
//           <input
//             type="file"
//             id="fileInput"
//             onChange={handleFileChange}
//             className="w-full border border-[#dddada] rounded-lg py-2.5 outline-none px-4 text-xs"
//           />
//           {fileError && (
//             <p className="text-red-500 text-xs mt-1">
//               Please select a file to upload.
//             </p>
//           )}
//         </div>

//         <UserPermissions
//           allUsers={allUsers}
//           handleUserSelection={handleUserSelection}
//           setChecked={setChecked}
//           checked={checked}
//         />

//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="w-full bg-[#3A5B22] rounded-lg py-2 text-white font-bold"
//         >
//           {isSubmitting ? "Submitting..." : "Submit"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UploadFiles;

// onClick={() => setOpen(!open)}

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
