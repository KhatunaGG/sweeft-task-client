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
import { z } from "zod";
import {  useCompanyStore } from "../store/sign-up.store";
import Link from "next/link";

export type CompanyType = {
  name: string;
  email: string;
  password: string;
  country: string;
  industry: string;
};

export const companySchema = z.object({
  name: z.string().min(1, { message: "Company name is required" }),
  email: z.string().email().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  industry: z.string().min(1, { message: "Industry is required" }),
});

const SignUp = () => {
  const {
    // formState,
    setFormState,
    createCompany,
    // axiosError,
    success,
    isLoading,
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
      // if (axiosError) {
      //   toast.error(axiosError);
      // }
    }
   
  };

  return (
    <section className=" flex items-center justify-center flex-col pb-6 w-[90%] md:max-w-[70%] lg:max-w-[40%]  rounded-xl shadow-[0px_0px_10px_#BEADFF]">
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full"
    >
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
          <NameField register={register} errors={errors} />
          <EmailField register={register} errors={errors} />
          <PasswordField register={register} errors={errors} />
          <CountryField register={register} errors={errors} />
          <IndustryField register={register} errors={errors} />
        </FormControl>

        <Button
          sx={{ width: "100%", paddingY: "12px" }}
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading || isSubmitting}
        >
          Sign up
        </Button>
      </Box>
    </form>
    <div className="w-full  text-base leading-[24px] font-normal text-center md:flex md:flex-row md:items-center md:justify-center md:gap-2">
        <p className="text-[#737373] ">Already have an account? </p>
        <Link href={"/sign-in"}>
          <p className="text-[#633CFF] cursor-pointer">Sign in</p>
        </Link>
      </div>
    </section>



  );
};

export default SignUp;
