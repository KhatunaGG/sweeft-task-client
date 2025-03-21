// "use client";
// import { Box, Button, FormControl, Typography } from "@mui/material";
// import NameField from "./NameField";
// import EmailField from "./EmailField";
// import PasswordField from "./PasswordField";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import LastNameField from "./LastNameField";
// import Image from "next/image";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useEffect, useState } from "react";
// import { axiosInstance } from "../libs/axiosInstance";
// import { useSearchParams } from "next/navigation";
// import { useRouter } from "next/navigation";
// import { setCookie } from "cookies-next";

// export const userSignInSchema = z.object({
//   firstName: z.string().min(1, { message: "Company name is required" }),
//   lastName: z.string().min(1, { message: "Company name is required" }),
//   userEmail: z.string().email().min(1, { message: "Email is required" }),
//   userPassword: z.string().min(1, { message: "Password is required" }),
// });

// export type UserSignInType = z.infer<typeof userSignInSchema>;

// const UserSignIn = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const searchParams = useSearchParams();
//   const [verificationStatus, setVerificationStatus] = useState(false);
//   const router = useRouter();

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
//   }, []);

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
//       console.log(res.data, "res data from front AddUser");
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

//   const onSubmit = async (formState: UserSignInType) => {
//     console.log(formState, "formState");
//     setIsLoading(true);
//     try {
//       const res = await axiosInstance.patch(
//         `user/update-user-sign-in`,
//         formState
//       );
//       if (res.status >= 200 && res.status <= 204) {
//         console.log(res.data.accessToken, "res data from front UserSignIn");
//         const accessToken = res.data.accessToken;
//         setCookie("accessToken", accessToken, { maxAge: 60 * 60 });
//         router.push("/");
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
//         </form>
//       </div>
//     </section>
//   );
// };

// export default UserSignIn;


//**************************************************************** */

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
import { useEffect, useState, useRef, Suspense } from "react";
import { axiosInstance } from "../libs/axiosInstance";
import { useSearchParams, useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

export const userSignInSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  userEmail: z.string().email().min(1, { message: "Email is required" }),
  userPassword: z.string().min(1, { message: "Password is required" }),
});

export type UserSignInType = z.infer<typeof userSignInSchema>;

// Define types for the EmailVerifier props
interface EmailVerifierProps {
  onVerificationComplete: (status: boolean) => void;
}

// Create a separate component for token verification
const EmailVerifier: React.FC<EmailVerifierProps> = ({ onVerificationComplete }) => {
  const verificationRef = useRef(false);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  
  useEffect(() => {
    // Only attempt verification once, when the component mounts
    const verifyToken = async () => {
      if (token && !verificationRef.current) {
        verificationRef.current = true; // Mark verification as attempted
        
        try {
          const res = await axiosInstance.get(`/user/verify-user?token=${token}`);
          if (res.status >= 200 && res.status <= 204) {
            toast.success("Email verified successfully!");
            onVerificationComplete(true);
          }
        } catch (e) {
          if (axios.isAxiosError(e) && e.response?.status === 404 && 
              e.response?.data?.message?.includes("already verified")) {
            // Handle already verified case
            toast.info("Email already verified. Please continue signing up.");
            onVerificationComplete(true);
          } else if (axios.isAxiosError(e)) {
            const message = e.response?.data?.message || "Verification failed";
            toast.error(message);
            onVerificationComplete(false);
          } else {
            toast.error("Unexpected error during verification");
            onVerificationComplete(false);
          }
        }
      } else if (!token) {
        // No token provided
        onVerificationComplete(false);
      }
    };
    
    verifyToken();
    
    // Cleanup function to prevent memory leaks
    return () => {
      verificationRef.current = true;
    };
  }, []); // Empty dependency array - run once on mount
  
  return null; // This component doesn't render anything
};

const UserSignInComponent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  // const [verificationStatus, setVerificationStatus] = useState(false);
  const router = useRouter();
  
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

  const handleVerificationComplete = (status: boolean): void => {
    // setVerificationStatus(status);
    if (status) {
      reset(); // Reset form on successful verification
    }
  };

  const onSubmit = async (formState: UserSignInType): Promise<void> => {
    if (Object.keys(errors).length > 0) {
      return;
    }
    
    setIsLoading(true);
    try {
      const res = await axiosInstance.patch(
        `user/update-user-sign-in`,
        formState
      );
      if (res.status >= 200 && res.status <= 204) {
        const accessToken = res.data.accessToken;
        setCookie("accessToken", accessToken, { maxAge: 60 * 60 });
        toast.success("Sign up successful!");
        router.push("/");
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
      console.error("Sign-in error:", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full min-h-screen flex items-start">
      {/* Verification handler component */}
      <EmailVerifier onVerificationComplete={handleVerificationComplete} />
      
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
                borderBottom: "2px solid rgb(133, 122, 177)",
              }}
            >
              Get Started Now
            </Typography>

            <FormControl
              sx={{
                width: "100%",
                display: "flex",
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

const UserSignIn: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserSignInComponent />
    </Suspense>
  );
};

export default UserSignIn;