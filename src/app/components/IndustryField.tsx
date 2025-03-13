// "use client";
// import {
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   SelectChangeEvent,
//   Typography,
// } from "@mui/material";
// import React from "react";
// import { FieldError, UseFormRegister } from "react-hook-form";
// import { CompanyType } from "./SignUp";
// import { useCompanyStore } from "../store/sign-up.store";
// import { register } from "module";

// export type IndustryFieldPropsType = {
//   register: UseFormRegister<CompanyType>;
//   errors: {
//     industry?: FieldError;
//   };
// };

// const IndustryField = ({ register, errors }: IndustryFieldPropsType) => {
//   return (
//     <div className="w-full relative">
//       <FormControl fullWidth>
//         <InputLabel id="demo-simple-select-label">Industry</InputLabel>
//         <Select
//           {...register("industry")}
//           label="Industry"
//           defaultValue={''}
//         >
//           <MenuItem value="aaa">aaa</MenuItem>
//           <MenuItem value="bbb">bbb</MenuItem>
//         </Select>
//         <Typography
//           sx={{
//             fontSize: "12px",
//             color: "red",
//             position: "absolute",
//             bottom: "-18px",
//           }}
//         >
//           {errors.industry?.message}
//         </Typography>
//       </FormControl>
//     </div>
//   );
// };

// export default IndustryField;

"use client";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  // SelectChangeEvent,
  Typography,
} from "@mui/material";
import React from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import { CompanyType } from "./SignUp";
// import { useCompanyStore } from "../store/sign-up.store";

export type IndustryFieldPropsType = {
  register: UseFormRegister<CompanyType>;
  errors: {
    industry?: FieldError;
  };
};

const IndustryField = ({ register, errors }: IndustryFieldPropsType) => {
  // const { formState, setFormState } = useCompanyStore();

  // const handleChange = (event: SelectChangeEvent) => {
  //   setFormState({
  //     ...formState,
  //     industry: event.target.value,
  //   });
  // };

  return (
    <div className="w-full relative">
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Industry</InputLabel>
        <Select
          {...register("industry")}
          label="Industry"
          // value={formState.industry}
          // onChange={handleChange}
        >
          <MenuItem value="aaa">aaa</MenuItem>
          <MenuItem value="bbb">bbb</MenuItem>
        </Select>
        <Typography
          sx={{
            fontSize: "12px",
            color: "red",
            position: "absolute",
            bottom: "-18px",
          }}
        >
          {errors.industry?.message}
        </Typography>
      </FormControl>
    </div>
  );
};
export default IndustryField;
