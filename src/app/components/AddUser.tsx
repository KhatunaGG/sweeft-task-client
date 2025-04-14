"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/sign-in.store";
import { axiosInstance } from "../libs/axiosInstance";
import { useUtilities } from "../store/utilities.store";
import { FormValue } from "../interface";
import { userEmailSendSchema } from "../schema";

// const userEmailSendSchema = z.object({
//   userEmail: z.string().email().min(1, "Email is requeued"),
// });

// type FormValue = z.infer<typeof userEmailSendSchema>;

const AddUser = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { accessToken } = useAuthStore();
  const { usersLength, getAllUsers } = useUtilities();

  useEffect(() => {
    getAllUsers();
  }, [accessToken]);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValue>({
    resolver: zodResolver(userEmailSendSchema),
    defaultValues: {
      userEmail: "",
    },
  });

  const onsubmit = async (formState: FormValue) => {
    setIsLoading(true);
    if (Object.keys(errors).length > 0) {
      return;
    }
    try {
      const res = await axiosInstance.post("user", formState, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (res.status >= 200 || res.status <= 204) {
        getAllUsers();
        reset();
        setOpen(!open);
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response) {
          const message = e.response.data?.message || "An error occurred";
          toast.error(message);
        } else {
          toast.error("Network error. Please try again later.");
        }
      } else {
        toast.error("Unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
      reset();
      setOpen(!open);
    }
  };

  return (
    <div className="UPLOAD-FILE flex flex-col gap-4 w-[33%]  ">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between bg-white rounded-lg shadow-xl px-4  py-4"
      >
        <h2 className="text-xl text-[#333] font-bold text-left">Add User</h2>
        <p className="text-sm text-[#3A5B22] font-bold">Users({usersLength})</p>
      </button>

      <form
        onSubmit={handleSubmit(onsubmit)}
        className={`${
          open ? "flex" : "hidden"
        } bg-white w-full px-4 pb-6 pt-4 rounded-lg  flex-col gap-6 shadow-xl`}
      >
        <div>
          <label className="w-full text-[#9b9494] text-xs ">
            New user&apos;s email
          </label>
          <input
            {...register("userEmail")}
            type="text"
            className="w-full border border-[#dddada] rounded-lg py-2 outline-none px-4 text-sm"
          />
          {errors.userEmail && (
            <p className="text-red-500 text-xs mt-1">
              {errors.userEmail.message}
            </p>
          )}
        </div>
        <button
          disabled={isLoading || isSubmitting}
          type="submit"
          className="w-full bg-[#3A5B22] rounded-lg py-2 text-white font=bold"
        >
          {isLoading || isSubmitting ? "Sending..." : "Send Verification Email"}
        </button>
      </form>
    </div>
  );
};

export default AddUser;
