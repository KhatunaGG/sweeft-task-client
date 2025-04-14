import { TextField, Typography } from "@mui/material";
import React from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import { CountryFieldPropsType } from "../interface";


// export type CountryFieldPropsType = {
//   register: UseFormRegister<CompanyType>;
//   errors: {
//     country?: FieldError;
//   };
// };

const CountryField = ({ register, errors }: CountryFieldPropsType) => {
  return (
    <div className="w-full relative">
      <TextField
        id="country"
        label="Country"
        sx={{ width: "100%" }}
        {...register("country")}
      />
      <Typography
        sx={{
          fontSize: "12px",
          color: "red",
          position: "absolute",
          bottom: "-18px",
        }}
      >
        {errors.country?.message}
      </Typography>
    </div>
  );
};

export default CountryField;
