// import { TextField, Typography } from "@mui/material";
// import React from "react";
// import { FieldError, UseFormRegister } from "react-hook-form";
// import { CompanyType } from "./SignUp";

// export type EmailFieldPropsType = {
//   register: UseFormRegister<CompanyType>;
//   errors: {
//     email?: FieldError;
//   };
// };

// const EmailField = ({ register, errors }: EmailFieldPropsType) => {
//   return (
//     <div className="w-full relative">
//       <TextField
//         id="email"
//         // value={email}
//         label="Email"
//         sx={{ width: "100%" }}
//         {...register("email")}
//       />
//       <Typography
//         sx={{
//           fontSize: "12px",
//           color: "red",
//           position: "absolute",
//           bottom: "-18px",
//         }}
//       >
//          {errors.email?.message}
//       </Typography>
//     </div>
//   );
// };

// export default EmailField;












//AFTER fieldName="useEmail"
import { TextField, Typography } from "@mui/material";
import React from "react";
import {

  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

export type EmailFieldPropsType<T extends FieldValues> = {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  fieldName: Path<T>;
};

const EmailField = <T extends FieldValues>({
  register,
  errors,
  fieldName,
}: EmailFieldPropsType<T>) => {
  const errorMessage = errors[fieldName]?.message;
  
  return (
    <div className="w-full relative">
      <TextField
        id={String(fieldName)}
        // value={email}
        // label={String(fieldName)}
        label={String(fieldName === "userEmail" ? "Email" : fieldName)} 
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

export default EmailField;
