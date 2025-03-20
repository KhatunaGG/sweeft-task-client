"use client";
import { TextField, Typography } from "@mui/material";
import React from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import { UserSignInType } from "./UserSignIn";

export type LastNamePropsType = {
  register: UseFormRegister<UserSignInType>;
  errors: {
    lastName?: FieldError;
  };
};

const LastNameField = ({ register, errors }: LastNamePropsType) => {
  return (
    <div className="w-full relative">
      <TextField
        id="lastName"
        label="Last Name"
        sx={{ width: "100%" }}
        {...register("lastName")}
      />
      <Typography
        sx={{
          fontSize: "12px",
          color: "red",
          position: "absolute",
          bottom: "-18px",
        }}
      >
        {errors.lastName?.message}
      </Typography>

      {/* <Typography
        sx={{
          fontSize: "12px",
          color: "red",
          position: "absolute",
          bottom: "-18px",
        }}
      >
        error massage
      </Typography> */}
    </div>
  );
};

export default LastNameField;
