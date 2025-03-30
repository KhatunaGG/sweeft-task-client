"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { IUser } from "../hooks/use-token";
import { useCallback, useEffect } from "react";
import EmailField from "./EmailField";
import PasswordField from "./PasswordField";

export const userUpdateSchema = z
  .object({
    updateEmail: z
      .string()
      .email()
      .min(1, { message: "Email is required" })
      .optional(),
    currentPassword: z
      .string()
      .min(1, { message: "Current password is required" })
      .optional(),
    newPassword: z
      .string()
      .min(1, { message: "New password is required" })
      .optional(),
  })
  .refine(
    (data) => {
      return !(data.currentPassword && !data.newPassword);
    },
    {
      message: "New password is required if current password is provided",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      return Object.values(data).some(
        (value) => value !== undefined && value !== ""
      );
    },
    {
      message: "At least one field must be updated",
      path: ["updateEmail", "currentPassword", "newPassword"],
    }
  );

export type UserUpdateType = z.infer<typeof userUpdateSchema>;

export type UserUpdateFormPropsType = {
  user: IUser;
};

const UserUpdateForm = ({ user }: UserUpdateFormPropsType) => {
  const {
    register,
    // handleSubmit,
    reset,
    formState: { errors,
        //  isSubmitting 
        },
  } = useForm<UserUpdateType>({
    resolver: zodResolver(userUpdateSchema),
    defaultValues: {
      updateEmail: user.userEmail || "",
      currentPassword: "",
      newPassword: "",
    },
  });

  const capitalize = useCallback((str: string | undefined) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }, []);

  useEffect(() => {
    if (user) {
      reset({
        updateEmail: capitalize(user.userEmail) || "",
        // updatePassword: capitalize(user.userEmail) || "",
      });
    }
  }, [user, reset]);

  return (
    <form className="w-full rounded-lg shadow-lg pt-4 pb-6 px-4 flex flex-col gap-4">
      <EmailField register={register} errors={errors} fieldName="updateEmail" />
      <PasswordField
        register={register}
        errors={errors}
        fieldName="currentPassword"
      />
      <PasswordField
        register={register}
        errors={errors}
        fieldName="newPassword"
      />

      <button
        type="submit"
        className="w-full rounded-lg bg-[#3A5B22] py-3 text-base text-white"
      >
        Update personal data
      </button>
    </form>
  );
};

export default UserUpdateForm;
