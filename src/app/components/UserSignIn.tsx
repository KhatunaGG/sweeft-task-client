// "use client";
// import { Box, Button, FormControl, Typography } from "@mui/material";
// import React, { useEffect } from "react";
// import NameField from "./NameField";
// import EmailField from "./EmailField";
// import PasswordField from "./PasswordField";
// import CountryField from "./CountryField";
// import IndustryField from "./IndustryField";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { useCompanyStore } from "../store/sign-up.store";
// import Link from "next/link";
// import LastNameField from "./LastNameField";

// export const userSignInSchema = z.object({
//   firstName: z.string().min(1, { message: "Company name is required" }),
//   lastName: z.string().min(1, { message: "Company name is required" }),
//   userEmail: z.string().email().min(1, { message: "Email is required" }),
//   userPassword: z.string().min(1, { message: "Password is required" }),
// });

// export type UserSignInType = z.infer<typeof userSignInSchema>;

// const UserSignIn = () => {
//   const {
//     // formState,
//     setFormState,
//     createCompany,
//     // axiosError,
//     success,
//     isLoading,
//   } = useCompanyStore();

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

//   const onSubmit = async (data: UserSignInType) => {
//     if (Object.keys(errors).length > 0) {
//       return;
//     }

//     try {
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   return (

//     <section className="w-[55%] border border-[#eae6e6] shadow-xl rounded-2xl">
//       <form
//         //   onSubmit={handleSubmit(onSubmit)}
//         className=""
//       >
//         <Box
//           sx={{
//             width: "100%",
//             padding: "20px",
//             height: "max",
//             display: "flex",
//             flexDirection: "column",
//             gap: "40px",
//             paddingBottom: "15px",
//           }}
//         >
//           <Typography
//             variant="h1"
//             sx={{
//               fontSize: "32px",
//               color: "#000",
//               borderBottom: "2px solidrgb(133, 122, 177)",
//             }}
//           >
//             Get Started Now
//           </Typography>

//           <FormControl
//             sx={{
//               width: "100%",
//               display: "flax",
//               flexDirection: "column",
//               gap: "30px",
//             }}
//           >

//             <NameField  register={register} errors={errors} fieldName="firstName" />
//             <LastNameField register={register} errors={errors} />
//             <EmailField register={register} errors={errors} fieldName="userEmail"  />
//             <PasswordField register={register} errors={errors} fieldName="userPassword" />
//           </FormControl>

//           <Button
//             sx={{
//               width: "100%",
//               paddingY: "12px",
//               background: "#3A5B22",
//               color: "white",
//               borderRadius: "12px",
//             }}
//             type="submit"
//             variant="contained"
//             // color="primary"
//             disabled={isLoading || isSubmitting}
//           >
//             Sign up
//           </Button>
//         </Box>
//       </form>
//       <div className="w-full  text-base leading-[24px] font-normal text-center md:flex md:flex-row md:items-center md:justify-center md:gap-2 pb-6">
//         <p className="text-[#737373] ">Already have an account? </p>
//         <Link href={"/sign-in"}>
//           <p className="text-[#3A5B22] cursor-pointer">Sign in</p>
//         </Link>
//       </div>
//     </section>
//   );
// };

// export default UserSignIn;

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

export const userSignInSchema = z.object({
  firstName: z.string().min(1, { message: "Company name is required" }),
  lastName: z.string().min(1, { message: "Company name is required" }),
  userEmail: z.string().email().min(1, { message: "Email is required" }),
  userPassword: z.string().min(1, { message: "Password is required" }),
});

export type UserSignInType = z.infer<typeof userSignInSchema>;

const UserSignIn = () => {


  const {
    register,
    // handleSubmit,
    // reset,
    formState: { errors,
        //  isSubmitting
        
        },
  } = useForm<UserSignInType>({
    resolver: zodResolver(userSignInSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      userEmail: "",
      userPassword: "",
    },
  });

 

//   const onSubmit = async (data: UserSignInType) => {
//     if (Object.keys(errors).length > 0) {
//       return;
//     }

//     try {
//     } catch (e) {
//       console.log(e);
//     }
//   };

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
          //   onSubmit={handleSubmit(onSubmit)}
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
            //   disabled={isLoading || isSubmitting}
            >
              Sign up
            </Button>
          </Box>
        </form>
      </div>
    </section>
  );
};

export default UserSignIn;
