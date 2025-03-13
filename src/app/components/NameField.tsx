// "use client";
// import { TextField, Typography } from "@mui/material";
// import React from "react";
// import { FieldError, UseFormRegister } from "react-hook-form";
// import { CompanyType } from "./SignUp";
// import { useCompanyStore } from "../store/sign-up.store";

// export type NameFieldPropsType = {
//   register: UseFormRegister<CompanyType>;
//   errors: {
//     name?: FieldError;
//   };
// };

// const NameField = ({ register, errors }: NameFieldPropsType) => {

//   const { name, setField } = useCompanyStore();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setField("name", value);
//   };

//   return (
//     <div className="w-full relative">
//       <TextField
//         id="name"
//         value={name}
//         label="Company Name"
//         sx={{ width: "100%" }}
//         // {...register("name")}
//         onChange={handleChange}
//       />

//       {/* <Typography
//         sx={{
//           fontSize: "12px",
//           color: "red",
//           position: "absolute",
//           bottom: "-18px",
//         }}
//       >
//         error massage
//       </Typography> */}
//     </div>
//   );
// };

// export default NameField;

"use client";
import { TextField, Typography } from "@mui/material";
import React from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import { CompanyType } from "./SignUp";

export type NameFieldPropsType = {
  register: UseFormRegister<CompanyType>;
  errors: {
    name?: FieldError;
  };
};

const NameField = ({ register, errors }: NameFieldPropsType) => {
  return (
    <div className="w-full relative">
      <TextField
        id="name"
        label="name"
        sx={{ width: "100%" }}
        {...register("name")}
      />
      <Typography
        sx={{
          fontSize: "12px",
          color: "red",
          position: "absolute",
          bottom: "-18px",
        }}
      >
        {errors.name?.message}
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

export default NameField;
