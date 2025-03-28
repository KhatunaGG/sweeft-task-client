"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { axiosInstance } from "../libs/axiosInstance";
import { useAuthStore } from "../store/sign-in.store";

export const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(4, "Password must be at least 4 characters"),
    // .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    // .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    // .regex(/[0-9]/, "Password must contain at least one number"),
    confirmNewPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

type PasswordFormValues = z.infer<typeof passwordSchema>;

const ChangePassword = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { accessToken } = useAuthStore();
  //   console.log(accessToken, "accessToken");
  const {
    register,
    reset,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onsubmit = async (formState: PasswordFormValues) => {
    if (Object.keys(errors).length > 0) {
      return;
    }
    setIsLoading(true);
    try {
      const res = await axiosInstance.post(
        "auth/change-password",
        {
          currentPassword: formState.currentPassword,
          newPassword: formState.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.status >= 200 && res.status <= 204) {
        toast.success(res.data?.message || "Password updated successfully");
        reset();
        setOpen(false);
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
    }
  };

  return (
    <div className="UPLOAD-FILE flex flex-col gap-4 w-[33%] ">
      <button
        onClick={() => setOpen((prev) => !prev)}
        type="button"
        className="w-full flex items-center justify-between bg-white rounded-lg shadow-xl px-4  py-4   "
      >
        <h2 className="text-xl text-[#333] font-bold">Change Password</h2>
        <p className="text-sm text-[#3A5B22] font-bold"></p>
      </button>

      <form
        onSubmit={handleSubmit(onsubmit)}
        className={`${
          open ? "flex" : "hidden"
        } bg-white w-full px-4 pb-6 pt-4 rounded-lg  flex-col gap-6 shadow-xl `}
      >
        <div>
          <label className="w-full text-[#9b9494] text-xs ">
            Current Password
          </label>
          <input
            {...register("currentPassword")}
            // type="password"
            type="text"
            className="w-full border border-[#dddada] rounded-lg py-2 outline-none px-4 text-sm"
          />
          {errors.currentPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.currentPassword.message}
            </p>
          )}
        </div>

        <div>
          <label className="w-full text-[#9b9494] text-xs ">New Password</label>
          <input
            {...register("newPassword")}
            // type="password"
            type="text"
            className="w-full border border-[#dddada] rounded-lg py-2 outline-none px-4 text-sm"
          />
          {errors.newPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        <div>
          <label className="w-full text-[#9b9494] text-xs ">
            Confirm Password
          </label>
          <input
            {...register("confirmNewPassword")}
            // type="password"
            type="text"
            className="w-full border border-[#dddada] rounded-lg py-2 outline-none px-4 text-sm"
          />
          {errors.confirmNewPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.confirmNewPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || isSubmitting}
          className="w-full bg-[#3A5B22] rounded-lg py-2 text-white font=bold"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
