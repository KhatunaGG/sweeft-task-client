import { z } from "zod";

export const userEmailSendSchema = z.object({
  userEmail: z.string().email().min(1, "Email is requeued"),
});

export const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(4, "Password must be at least 4 characters"),
    confirmNewPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

export const companySchema = z.object({
  name: z.string().min(1, { message: "Company name is required" }),
  email: z.string().email().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  industry: z.string().min(1, { message: "Industry is required" }),
});

export const userSignInSchema = z.object({
  firstName: z.string().min(1, { message: "Company name is required" }),
  lastName: z.string().min(1, { message: "Company name is required" }),
  userEmail: z.string().email().min(1, { message: "Email is required" }),
  userPassword: z.string().min(1, { message: "Password is required" }),
});

export const SignInSchema = z.object({
  email: z.string().email().min(1, "Company name is required"),
  password: z.string().min(1, { message: "Password is required" }),
});
