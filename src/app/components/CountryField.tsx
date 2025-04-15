import { TextField, Typography } from "@mui/material";
import React from "react";
import { CountryFieldPropsType } from "../interface";

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
