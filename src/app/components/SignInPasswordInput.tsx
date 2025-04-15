import { TextField, Typography } from "@mui/material";
import React from "react";
import { SignInPasswordInputPropsType } from "../interface";

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
