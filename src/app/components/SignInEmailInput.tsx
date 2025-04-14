import { TextField, Typography } from "@mui/material";
import React from "react";
// import { FieldError, UseFormRegister } from "react-hook-form";
import { SignInEmailInputPropsType } from "../interface";
// import { SignInType } from "./SignIn";

// export type SignInEmailInputPropsType = {
//   register: UseFormRegister<SignInType>;
//   errors: {
//     email?: FieldError;
//   };
// };

const SignInEmailInput = ({ register, errors }: SignInEmailInputPropsType) => {
  return (
    <div className="w-full relative">
      <TextField
        id="email"
        label="Email"
        sx={{ width: "100%" }}
        {...register("email")}
      />
      <Typography
        sx={{
          fontSize: "12px",
          color: "red",
          position: "absolute",
          bottom: "-18px",
        }}
      >
        {errors.email?.message}
      </Typography>
    </div>
  );
};

export default SignInEmailInput;
