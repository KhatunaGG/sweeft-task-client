import { TextField, Typography } from "@mui/material";
import React from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import { SignInPasswordInputPropsType } from "../interface";
// import { SignInType } from "./SignIn";

// export type SignInPasswordInputPropsType = {
//   register: UseFormRegister<SignInType>;
//   errors: {
//     password?: FieldError;
//   };
// };

const SignInPasswordInput = ({
  errors,
  register,
}: SignInPasswordInputPropsType) => {
  return (
    <div className="w-full relative">
      <TextField
        id="password"
        label="Password"
        type="password"
        sx={{ width: "100%" }}
        {...register("password")}
      />
      <Typography
        sx={{
          fontSize: "12px",
          color: "red",
          position: "absolute",
          bottom: "-18px",
        }}
      >
        {errors.password?.message}
      </Typography>
    </div>
  );
};

export default SignInPasswordInput;
