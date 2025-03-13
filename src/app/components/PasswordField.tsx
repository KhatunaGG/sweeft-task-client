import { TextField, Typography } from "@mui/material";
import React from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import { CompanyType } from "./SignUp";

export type PasswordFieldPropsType = {
  register: UseFormRegister<CompanyType>;
  errors: {
    password?: FieldError;
  };
};

const PasswordField = ({ register, errors }: PasswordFieldPropsType) => {
  // const {password, setField} = useCompanyStore()
  return (
    <div className="w-full relative">
      <TextField
        id="password"
        label="Password"
        // value={password}
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

export default PasswordField;
