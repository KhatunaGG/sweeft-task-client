import { TextField, Typography } from "@mui/material";
import React from "react";
import { SignInEmailInputPropsType } from "../interface";

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
