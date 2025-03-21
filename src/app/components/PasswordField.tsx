// import { TextField, Typography } from "@mui/material";
// import React from "react";
// import { FieldError, UseFormRegister } from "react-hook-form";
// import { CompanyType } from "./SignUp";

// export type PasswordFieldPropsType = {
//   register: UseFormRegister<CompanyType>;
//   errors: {
//     password?: FieldError;
//   };
// };

// const PasswordField = ({ register, errors }: PasswordFieldPropsType) => {
//   // const {password, setField} = useCompanyStore()
//   return (
//     <div className="w-full relative">
//       <TextField
//         id="password"
//         label="Password"
//         type="password"
//         // value={password}
//         sx={{ width: "100%" }}
//         {...register("password")}
//       />
//       <Typography
//         sx={{
//           fontSize: "12px",
//           color: "red",
//           position: "absolute",
//           bottom: "-18px",
//         }}
//       >
//          {errors.password?.message}
//       </Typography>
//     </div>
//   );
// };

// export default PasswordField;

//AFTER fieldName="useEmail"
import { TextField, Typography } from "@mui/material";
import React from "react";
import {
  // FieldError,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

export type PasswordFieldPropsType<T extends FieldValues> = {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  fieldName: Path<T>;
};

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
        // label={String(fieldName)}
        label={String(fieldName === "userPassword" ? "Password" : fieldName)}
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
        {/* {typeof errorMessage === "string" ? errorMessage : "Invalid input"} */}
        {typeof errorMessage === "string" && errorMessage}
      </Typography>
    </div>
  );
};

export default PasswordField;
