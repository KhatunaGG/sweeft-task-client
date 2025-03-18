import { TextField, Typography } from "@mui/material";
import React from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import { SignInType } from "./SignIn";
// import { useSignInStore } from "../store/sign-in.store"; // Update this path

export type SignInEmailInputPropsType = {
  register: UseFormRegister<SignInType>;
  errors: {
    email?: FieldError;
  };
};

const SignInEmailInput = ({ register, errors }: SignInEmailInputPropsType) => {
  // Get the store state and update function
//   const email = useSignInStore(state => state.signInFormState.email);
//   const setEmail = useSignInStore(state => state.setEmail);

  return (
    <div className="w-full relative">
      <TextField
        id="email"
        label="Email"
        sx={{ width: "100%" }}
        {...register("email")}
        // The following is optional if you want direct control
        // value={email}
        // onChange={(e) => setEmail(e.target.value)}
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