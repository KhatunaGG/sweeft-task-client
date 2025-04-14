"use client";
import { TextField, Typography } from "@mui/material";
import React from "react";
import {
  UseFormRegister,
  FieldValues,
  Path,
  FieldErrors,
} from "react-hook-form";
import { NameFieldPropsType } from "../interface";

// export type NameFieldPropsType<T extends FieldValues> = {
//   register: UseFormRegister<T>;
//   errors: FieldErrors<T>;
//   fieldName: Path<T>;
// };

const NameField = <T extends FieldValues>({
  register,
  errors,
  fieldName,
}: NameFieldPropsType<T>) => {
  const errorMessage = errors[fieldName]?.message;

  return (
    <div className="w-full relative">
      <TextField
        id={String(fieldName)}
        // label={String(fieldName)}
        // label={String(fieldName === "firstName" ? "Name" : fieldName)}
        label={String(
          fieldName === "firstName" || fieldName === "updateName"
            ? "Name"
            : fieldName
        )}
        sx={{ width: "100%" }}
        {...register(fieldName)}
      />
      {errorMessage && (
        <Typography
          sx={{
            fontSize: "12px",
            color: "red",
            position: "absolute",
            bottom: "-18px",
          }}
        >
          {typeof errorMessage === "string" ? errorMessage : "Invalid input"}
        </Typography>
      )}
    </div>
  );
};

export default NameField;
