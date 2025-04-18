"use client";
import { Box, Button, FormControl, Typography } from "@mui/material";
import Link from "next/link";
import React, { useEffect, Suspense } from "react";
import SignInEmailInput from "./SignInEmailInput";
import SignInPasswordInput from "./SignInPasswordInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "../store/sign-in.store";
import { toast } from "react-toastify";
import { SignInType } from "../interface";
import { SignInSchema } from "../schema";

const SignInContent = () => {
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
  }, [searchParams]);

  useEffect(() => {
    if (verificationStatus?.success) {
      reset();
    } else if (verificationStatus?.success === false) {
      toast.error("Email verification failed. Please try again.");
    }
  }, [verificationStatus, reset]);

  useEffect(() => {
    if (accessToken) {
      router.push("/");
    }
  }, [accessToken, router]);

  const onSubmit = async (data: SignInType) => {
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
    <section className="w-[55%] border border-[#eae6e6] shadow-xl rounded-2xl ">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <Box
          sx={{
            width: "100%",
            padding: "20px",
            height: "max",
            display: "flex",
            flexDirection: "column",
            gap: "40px",
            paddingBottom: "15px",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: "32px",
              color: "#000",
              borderBottom: "2px solidrgb(133, 122, 177)",
            }}
          >
            Welcome back!
          </Typography>

          <FormControl
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "30px",
            }}
          >
            <SignInEmailInput register={register} errors={errors} />
            <SignInPasswordInput register={register} errors={errors} />
          </FormControl>

          <Button
            sx={{
              width: "100%",
              paddingY: "12px",
              background: "#3A5B22",
              color: "white",
              borderRadius: "12px",
            }}
            type="submit"
            variant="contained"
            disabled={isLoading || isSubmitting}
          >
            Sign in
          </Button>
        </Box>
      </form>
      <div className="w-full text-base leading-[24px] font-normal text-center md:flex md:flex-row md:items-center md:justify-center md:gap-2 pb-6">
        <p className="text-[#737373] ">Don&apos;t have an account?</p>
        <Link href={"/sign-up"}>
          <p className="text-[#3A5B22] cursor-pointer">Create account</p>
        </Link>
      </div>
    </section>
  );
};

const LoadingFallback = () => (
  <div className="w-full h-full flex items-center justify-center">
    <p>Loading...</p>
  </div>
);

const SignIn = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <SignInContent />
    </Suspense>
  );
};

export default SignIn;
