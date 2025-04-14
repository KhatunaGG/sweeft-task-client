import { TextField, Typography } from "@mui/material";
import React from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { PasswordFieldPropsType } from "../interface";

// export type PasswordFieldPropsType<T extends FieldValues> = {
//   register: UseFormRegister<T>;
//   errors: FieldErrors<T>;
//   fieldName: Path<T>;
// };

const PasswordField = <T extends FieldValues>({
  register,
  errors,
  fieldName,
}: PasswordFieldPropsType<T>) => {
  const errorMessage = errors[fieldName]?.message;
  return (
    <div className="w-full relative">
      <TextField
        id={String(fieldName)}
        label={String(
          fieldName === "userPassword"
            ? "Password"
            : fieldName === "currentPassword"
            ? "Current Password"
            : fieldName === "newPassword"
            ? "New Password"
            : fieldName
        )}
        type="password"
        sx={{ width: "100%" }}
        {...register(fieldName)}
      />
      <Typography
        sx={{
          fontSize: "12px",
          color: "red",
          position: "absolute",
          bottom: "-18px",
        }}
      >
        {typeof errorMessage === "string" && errorMessage}
      </Typography>
    </div>
  );
};

export default PasswordField;
