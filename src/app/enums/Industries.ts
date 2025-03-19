// export const industries = [
//   "Finance",
//   "Healthcare",
//   "Technology",
//   "Retail",
//   "Manufacturing",
//   "Real Estate",
//   "Education",
//   "Hospitality",
// ];

export enum Industries {
  FINANCE = "Finance",
  HEALTHCARE = "Healthcare",
  TECHNOLOGY = "Technology",
  RETAIL = "Retail",
  MANUFACTURING = "Manufacturing",
  REAL_ESTATE = "Real Estate",
  EDUCATION = "Education",
  HOSPITALITY = "Hospitality",
}

export type Industry =
  | "Finance"
  | "Healthcare"
  | "Technology"
  | "Retail"
  | "Manufacturing"
  | "Real Estate"
  | "Education"
  | "Hospitality";

export enum ETier {
  FREE = "free",
  BASIC = "basic",
  PREMIUM = "premium",
}

// // Example of using the enum in a component or function
// import { Industries } from './src/enums/Industries';

// const selectedIndustry: Industries = Industries.FINANCE;

// console.log(selectedIndustry);  // Output: Finance

// // Example function
// function getIndustryInfo(industry: Industries) {
//   switch (industry) {
//     case Industries.FINANCE:
//       return "Finance industry involves banking, investments, etc.";
//     case Industries.HEALTHCARE:
//       return "Healthcare industry involves hospitals, doctors, etc.";
//     // Add more cases for other industries...
//     default:
//       return "Industry not found";
//   }
// }

// console.log(getIndustryInfo(Industries.RETAIL));  // Output: Retail industry involves shopping, stores, etc.
