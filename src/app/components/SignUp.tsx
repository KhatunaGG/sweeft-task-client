"use client";
import { Box, Button, FormControl, Typography } from "@mui/material";
import React, { useEffect } from "react";
import NameField from "./NameField";
import EmailField from "./EmailField";
import PasswordField from "./PasswordField";
import CountryField from "./CountryField";
import IndustryField from "./IndustryField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCompanyStore } from "../store/sign-up.store";
import Link from "next/link";
import { CompanyType } from "../interface";
import { companySchema } from "../schema";

const SignUp = () => {
  const {
    setFormState,
    createCompany,
    success,
    isLoading,
    linkResendCount,
    getResendLink,
    resendEmail,
    show,
  } = useCompanyStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CompanyType>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      country: "",
      industry: "",
    },
  });

  useEffect(() => {
    if (success) {
      reset({
        name: "",
        email: "",
        password: "",
        country: "",
        industry: "",
      });
    }
  }, [success, reset]);

  const onSubmit = async (data: CompanyType) => {
    if (Object.keys(errors).length > 0) {
      return;
    }
    setFormState(data);

    try {
      await createCompany(data);
      if (success === true) {
        reset();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <section className="w-[55%] border border-[#eae6e6] shadow-xl rounded-2xl">
      <form onSubmit={handleSubmit(onSubmit)} className="">
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
            Get Started Now
          </Typography>

          <FormControl
            sx={{
              width: "100%",
              display: "flax",
              flexDirection: "column",
              gap: "30px",
            }}
          >
            <NameField register={register} errors={errors} fieldName="name" />
            <EmailField register={register} errors={errors} fieldName="email" />
            <PasswordField
              register={register}
              errors={errors}
              fieldName="password"
            />
            <CountryField register={register} errors={errors} />
            <IndustryField register={register} errors={errors} />
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
            Sign up
          </Button>
        </Box>
      </form>
      <div className="w-full flex flex-col gap-2 items-center text-base leading-[24px] font-normal text-center md:flex md:flex-col md:items-center md:justify-center md:gap-1 pb-6 ">
        <div className="w-ful flex items-center gap-2">
          <p className="text-[#737373] ">Already have an account? </p>
          <Link href={"/sign-in"}>
            <p className="text-[#3A5B22] cursor-pointer">Sign in</p>
          </Link>
        </div>
        {show && (
          <div className="w-full flex flex-col gap-1 items-center  ">
            <button
              onClick={() => getResendLink(resendEmail)}
              type="button"
              className="text-xs text-[#3A5B22] font-semibold cursor-pointer hover:underline transition-transform duration-300 ease-in-out hover:scale-105"
            >
              Resend verification link
            </button>

            <p className="text-xs text-gray-600">
              Verification email resent {linkResendCount} times. (Maximum: 3
              attempts per 24 hours)
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SignUp;
