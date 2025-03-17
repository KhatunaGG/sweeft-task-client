"use client";
import { Box, Button, FormControl, Typography } from "@mui/material";
import Link from "next/link";
import React, { useEffect } from "react";
import SignInEmailInput from "./SignInEmailInput";
import SignInPasswordInput from "./SignInPasswordInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "../store/sign-in.store";
import { toast } from "react-toastify";

export type SignInType = {
  email: string;
  password: string;
};

export const SignInSchema = z.object({
  email: z.string().email().min(1, "Company name is required"),
  password: z.string().min(1, { message: "Password is required" }),
});

const SignIn = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { verifyEmail, verificationStatus, login, isLoading, accessToken } =
    useAuthStore();


  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      verifyEmail(token);
      if (verificationStatus?.success === true) {
        router.push("/sign-in");
        reset();
      } else {
        return;
      }
    }
  }, [searchParams, verifyEmail, router]);


  useEffect(() => {
    if (verificationStatus?.success) {
      reset();
    } else if (verificationStatus?.success === false) {
      toast.error("Email verification failed. Please try again.");
    }
  }, [verificationStatus, reset]);





  useEffect(() => {
    if (accessToken) {
      // router.push("/dashboard");
      router.push("/");
    }
  }, [accessToken, router]);

  const onSubmit = async (data: SignInType) => {
    console.log(data, "Sign in");
    if (Object.keys(errors).length > 0) {
      return;
    }
    try {
      await login(data);
      if (verificationStatus?.success === true) {
        reset();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <section className=" flex items-center justify-center flex-col pb-6 w-[90%] md:max-w-[70%] lg:max-w-[40%]  rounded-xl shadow-[0px_0px_10px_#BEADFF]">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <Box
          sx={{
            width: "100%",
            padding: "20px",
            height: "max",
            display: "flex",
            flexDirection: "column",
            gap: "40px",
            paddingBottom: "40px",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: "32px",
              color: "#BEADFF",
              borderBottom: "2px solidrgb(133, 122, 177)",
            }}
          >
            sign Up
          </Typography>

          <FormControl
            sx={{
              width: "100%",
              display: "flax",
              flexDirection: "column",
              gap: "30px",
            }}
          >
            <SignInEmailInput register={register} errors={errors} />
            <SignInPasswordInput register={register} errors={errors} />
          </FormControl>

          <Button
            sx={{ width: "100%", paddingY: "12px" }}
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading || isSubmitting}
          >
            Sign in
          </Button>
        </Box>
      </form>
      <div className="w-full  text-base leading-[24px] font-normal text-center md:flex md:flex-row md:items-center md:justify-center md:gap-2">
        <p className="text-[#737373] ">Don’t have an account?</p>
        <Link href={"/sign-up"}>
          <p className="text-[#633CFF] cursor-pointer">Create account</p>
        </Link>
      </div>
    </section>
  );
};

export default SignIn;
