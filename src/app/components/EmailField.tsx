import { TextField, Typography } from "@mui/material";
import React from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import { CompanyType } from "./SignUp";


export type EmailFieldPropsType = {
  register: UseFormRegister<CompanyType>;
  errors: {
    email?: FieldError;
  };
};

const EmailField = ({ register, errors }: EmailFieldPropsType) => {
  return (
    <div className="w-full relative">
      <TextField
        id="email"
        // value={email}
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

export default EmailField;
