// "use client";
// import { Box, Button, FormControl, Link, Typography } from "@mui/material";
// import NameField from "./NameField";
// import EmailField from "./EmailField";
// import PasswordField from "./PasswordField";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import LastNameField from "./LastNameField";
// import Image from "next/image";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { Suspense, useEffect, useState } from "react";
// import { axiosInstance } from "../libs/axiosInstance";
// import { useSearchParams } from "next/navigation";
// import { useRouter } from "next/navigation";
// import { UserSignInType } from "../interface";
// import { userSignInSchema } from "../schema";

// const UserSignIn = () => {
//   const [isClient, setIsClient] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const searchParams = useSearchParams();
//   const [verificationStatus, setVerificationStatus] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   useEffect(() => {
//     const token = searchParams.get("token");
//     if (token) {
//       verifyUsersEmail(token);
//       if (verificationStatus === true) {
//         reset();
//       } else {
//         return;
//       }
//     }
//   }, [searchParams]);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors, isSubmitting },
//   } = useForm<UserSignInType>({
//     resolver: zodResolver(userSignInSchema),
//     defaultValues: {
//       firstName: "",
//       lastName: "",
//       userEmail: "",
//       userPassword: "",
//     },
//   });

//   const verifyUsersEmail = async (verificationToken: string) => {
//     setVerificationStatus(false);
//     try {
//       const res = await axiosInstance.get(
//         `/user/verify-user?token=${verificationToken}`
//       );
//       if (res.status >= 200 && res.status <= 204) {
//         setVerificationStatus(true);
//       }
//     } catch (e) {
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
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (!isClient) {
//     return null;
//   }

//   const onSubmit = async (formState: UserSignInType) => {
//     setIsLoading(true);
//     try {
//       const res = await axiosInstance.patch(
//         `user/update-user-sign-in`,
//         formState
//       );
//       if (res.status >= 200 && res.status <= 204) {
//         router.push("/sign-in");
//         reset();
//       }
//     } catch (e) {
//       console.log(e);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <section className="w-full min-h-screen flex items-start ">
//       <div className="relative w-[535px] h-screen">
//         <Image
//           src="/assets/img.png"
//           alt="Image description"
//           fill
//           priority
//           sizes="(max-width: 535px) 100vw, 50vw"
//           className="rounded-r-4xl"
//         />
//       </div>
//       <div className="w-[75%] min-h-screen flex items-center justify-center">
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="w-[55%] border border-[#eae6e6] shadow-xl rounded-2xl pb-6"
//         >
//           <Box
//             sx={{
//               width: "100%",
//               padding: "20px",
//               height: "max",
//               display: "flex",
//               flexDirection: "column",
//               gap: "40px",
//               paddingBottom: "15px",
//             }}
//           >
//             <Typography
//               variant="h1"
//               sx={{
//                 fontSize: "32px",
//                 color: "#000",
//                 borderBottom: "2px solidrgb(133, 122, 177)",
//               }}
//             >
//               Get Started Now
//             </Typography>

//             <FormControl
//               sx={{
//                 width: "100%",
//                 display: "flax",
//                 flexDirection: "column",
//                 gap: "30px",
//               }}
//             >
//               <NameField
//                 register={register}
//                 errors={errors}
//                 fieldName="firstName"
//               />
//               <LastNameField register={register} errors={errors} />
//               <EmailField
//                 register={register}
//                 errors={errors}
//                 fieldName="userEmail"
//               />
//               <PasswordField
//                 register={register}
//                 errors={errors}
//                 fieldName="userPassword"
//               />
//             </FormControl>

//             <Button
//               sx={{
//                 width: "100%",
//                 paddingY: "12px",
//                 background: "#3A5B22",
//                 color: "white",
//                 borderRadius: "12px",
//               }}
//               type="submit"
//               variant="contained"
//               disabled={isLoading || isSubmitting}
//             >
//               Sign up
//             </Button>
//           </Box>

//           {/* <div className="w-full flex flex-col gap-2 items-center text-base leading-[24px] font-normal text-center md:flex md:flex-col md:items-center md:justify-center md:gap-1 pb-6 ">
//         <div className="w-ful flex items-center gap-2">
//           <p className="text-[#737373] ">Already have an account? </p>
//           <Link href={"/sign-in"}>
//             <p className="text-[#3A5B22] cursor-pointer">Sign in</p>
//           </Link>
//         </div>
//         {show && (
//           <div className="w-full flex flex-col gap-1 items-center  ">
//             <button
//               onClick={() => getResendLink(resendEmail)}
//               type="button"
//               className="text-xs text-[#3A5B22] font-semibold cursor-pointer hover:underline transition-transform duration-300 ease-in-out hover:scale-105"
//             >
//               Resend verification link
//             </button>

//             <p className="text-xs text-gray-600">
//               Verification email resent {linkResendCount} times. (Maximum: 3
//               attempts per 24 hours)
//             </p>
//           </div>
//         )}
//       </div> */}

//         </form>
//       </div>
//     </section>
//   );
// };

// const UserSignInPage = () => {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <UserSignIn />
//     </Suspense>
//   );
// };

// export default UserSignInPage;

"use client";
import { Box, Button, FormControl, Link, Typography } from "@mui/material";
import NameField from "./NameField";
import EmailField from "./EmailField";
import PasswordField from "./PasswordField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useCompanyStore } from "../store/sign-up.store";

const UserSignIn = () => {
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const [verificationStatus, setVerificationStatus] = useState(false);
  const { getResendLink, linkResendCount } = useCompanyStore();
  const router = useRouter();
  // const [userResendEmail, setUserResendEmail] = useState("")

  // console.log(userResendEmail, "userResendEmail");

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

  // useEffect(() => {
  //   if (!isClient) return;

  //   const storedEmail = localStorage.getItem("userResendEmail");
  //   if (storedEmail) {
  //     setUserResendEmail(storedEmail);
  //   }
  // }, [isClient]);

  const verifyUsersEmail = async (verificationToken: string) => {
    setVerificationStatus(false);
    try {
      const res = await axiosInstance.get(
        `/user/verify-user?token=${verificationToken}`
      );
      if (res.status >= 200 && res.status <= 204) {
        setVerificationStatus(true);
        // setUserResendEmail(res.data.userEmail)
        // localStorage.setItem("userResendEmail", res.data.userEmail);
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

          <div className="w-full flex flex-col gap-2 items-center text-base leading-[24px] font-normal text-center md:flex md:flex-col md:items-center md:justify-center md:gap-1 pb-6 ">
            {/* <div className="w-ful flex items-center gap-2">
              <p className="text-[#737373] ">Already have an account? </p>
              <Link href={"/sign-in"}>
                <p className="text-[#3A5B22] cursor-pointer">Sign in</p>
              </Link>
            </div> */}

           
          </div>
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
