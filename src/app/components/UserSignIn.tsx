"use client";
import { Box, Button, FormControl, Typography } from "@mui/material";
import NameField from "./NameField";
import EmailField from "./EmailField";
import PasswordField from "./PasswordField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import LastNameField from "./LastNameField";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import { Suspense, useEffect, useState } from "react";
import { axiosInstance } from "../libs/axiosInstance";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { UserSignInType } from "../interface";
import { userSignInSchema } from "../schema";

// export const userSignInSchema = z.object({
//   firstName: z.string().min(1, { message: "Company name is required" }),
//   lastName: z.string().min(1, { message: "Company name is required" }),
//   userEmail: z.string().email().min(1, { message: "Email is required" }),
//   userPassword: z.string().min(1, { message: "Password is required" }),
// });

// export type UserSignInType = z.infer<typeof userSignInSchema>;

const UserSignIn = () => {
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const [verificationStatus, setVerificationStatus] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      verifyUsersEmail(token);
      if (verificationStatus === true) {
        reset();
      } else {
        return;
      }
    }
  }, [searchParams]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserSignInType>({
    resolver: zodResolver(userSignInSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      userEmail: "",
      userPassword: "",
    },
  });

  const verifyUsersEmail = async (verificationToken: string) => {
    setVerificationStatus(false);
    try {
      const res = await axiosInstance.get(
        `/user/verify-user?token=${verificationToken}`
      );
      if (res.status >= 200 && res.status <= 204) {
        setVerificationStatus(true);
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

  if (!isClient) {
    return null;
  }

  const onSubmit = async (formState: UserSignInType) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.patch(
        `user/update-user-sign-in`,
        formState
      );
      if (res.status >= 200 && res.status <= 204) {
        router.push("/sign-in");
        reset();
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full min-h-screen flex items-start ">
      <div className="relative w-[535px] h-screen">
        <Image
          src="/assets/img.png"
          alt="Image description"
          fill
          priority
          sizes="(max-width: 535px) 100vw, 50vw"
          className="rounded-r-4xl"
        />
      </div>
      <div className="w-[75%] min-h-screen flex items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[55%] border border-[#eae6e6] shadow-xl rounded-2xl pb-6"
        >
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
              <NameField
                register={register}
                errors={errors}
                fieldName="firstName"
              />
              <LastNameField register={register} errors={errors} />
              <EmailField
                register={register}
                errors={errors}
                fieldName="userEmail"
              />
              <PasswordField
                register={register}
                errors={errors}
                fieldName="userPassword"
              />
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
      </div>
    </section>
  );
};

const UserSignInPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserSignIn />
    </Suspense>
  );
};

export default UserSignInPage;
