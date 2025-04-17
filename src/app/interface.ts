import { z } from "zod";
import {
  passwordSchema,
  userEmailSendSchema,
  userSignInSchema,
} from "./schema";
import {
  FieldError,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { Dispatch, SetStateAction } from "react";
import { ETier } from "./enums/Industries";

export type FormValue = z.infer<typeof userEmailSendSchema>;
export type PasswordFormValues = z.infer<typeof passwordSchema>;
export type UserSignInType = z.infer<typeof userSignInSchema>;

export type CompanyType = {
  name: string;
  email: string;
  password: string;
  country: string;
  industry: string;
};

export type CountryFieldPropsType = {
  register: UseFormRegister<CompanyType>;
  errors: {
    country?: FieldError;
  };
};

export type EmailFieldPropsType<T extends FieldValues> = {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  fieldName: Path<T>;
};

export type PermissionType = {
  permissionById: string;
  permissionByEmail: string;
};

export type IndustryFieldPropsType = {
  register: UseFormRegister<CompanyType>;
  errors: {
    industry?: FieldError;
  };
};

export type LastNamePropsType = {
  register: UseFormRegister<UserSignInType>;
  errors: {
    lastName?: FieldError;
  };
};

export type NameFieldPropsType<T extends FieldValues> = {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  fieldName: Path<T>;
};

export type PaginationPropsType = {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
  isLoading?: boolean;
};

export type PasswordFieldPropsType<T extends FieldValues> = {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  fieldName: Path<T>;
};

export type SignInType = {
  email: string;
  password: string;
};

export type SignInEmailInputPropsType = {
  register: UseFormRegister<SignInType>;
  errors: {
    email?: FieldError;
  };
};

export type SignInPasswordInputPropsType = {
  register: UseFormRegister<SignInType>;
  errors: {
    password?: FieldError;
  };
};

export type UserPermissionsPropsType = {
  allUsers: IUser[];
  handleUserSelection: (
    userId: string,
    email: string,
    isChecked: boolean
  ) => void;
  setChecked: Dispatch<SetStateAction<string | null>>;
  checked: string | null;
};

export interface IUser {
  _id: string;
  userEmail: string;
  companyId: string;
  isVerified: boolean;
  validationLink: string | null;
  validationLinkValidateDate: string | null;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  firstName?: string;
  lastName?: string;
}

export interface ICompany {
  _id: string;
  name: string;
  email: string;
  country: string;
  industry: string;
  isVerified: boolean;
  validationLink: string | null;
  validationLinkValidateDate: string | null;
  role: string;
  subscriptionPlan: string;
  uploadedFiles: string[];
  user: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  premiumCharge: number;
  extraUserCharge: number;
  extraFileCharge: number;
}

export interface IFile {
  _id: string;
  filePath: string;
  fileOwnerId: string;
  fileOwnerCompanyId: string;
  userPermissions: string[];
  fileName: string;
  extension: string;
  contentType?: string;
}

export interface ErrorResponse {
  message: string;
}

// export interface IUser {
//   _id: string;
//   userEmail: string;
//   companyId: string;
//   isVerified: boolean;
//   validationLink: string | null;
//   validationLinkValidateDate: string | null;
//   role: string;
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
//   firstName?: string;
//   lastName?: string;
// }

export interface IUtilities {
  allUsers: IUser[];
  allFiles: IFile[];
  usersLength: number;
  filesLength: number;
  usersPage: number;
  usersTake: number;
  filesPage: number;
  filesTake: number;
  axiosError?: string | null;

  setAxiosError: (axiosError: string | null) => void;
  setUsersPage: (page: number) => void;
  setUsersTake: (take: number) => void;
  setFilesPage: (page: number) => void;
  setFilesTake: (take: number) => void;
  setAllFiles: (allFiles: IFile[]) => void;
  setAllUsers: (allUsers: IUser[]) => void;
  getAllUsers: () => Promise<void>;
  getAllFiles: () => Promise<void>;
}

export interface ISubscriptionStor {
  subscriptionPlan: ETier;
  activeSubscription: ETier;
  axiosError: string | null;
  verificationStatus: { resStatus: number; message: string } | null;
  setVerificationStatus: (status: {
    resStatus: number;
    message: string;
  }) => void;
  setActiveSubscription: (subscriptionPlan: ETier) => void;
  setTier: (subscriptionPlan: ETier) => void;
  handleSubscriptionUpdate: (subscriptionPlan: ETier, et: string) => void;
}

export interface ICompanyStore {
  formState: CompanyType;
  setFormState: (formState: ICompanyStore["formState"]) => void;
  createCompany: (data: CompanyType) => void;
  resendEmail: string;
  setResendEmail: (resendEmail: string) => void;
  success: boolean;
  axiosError: string;
  isLoading: boolean;
  linkResendCount: number;
  setLinkResendCount: (linkResendCount: number) => void;
  getResendLink: (email: string) => void;

  clearPersistedState: () => void;


  show: boolean;
  setShow:(show: boolean) => void;
}

export interface ISignIn {
  signInFormState: SignInType;
  verificationStatus: { success: boolean; message: string } | null;
  axiosError: string | null;
  isLoading: boolean;
  accessToken: string | null;
  user: IUser | null;
  company: ICompany | null;
  setAccessToken: (token: string) => void;
  setVerificationStatus: (status: {
    success: boolean;
    message: string;
  }) => void;
  setEmail: (email: string) => void;
  setUser: (user: IUser | null) => void;
  setCompany: (company: ICompany | null) => void;
  verifyEmail: (token: string) => void;
  login: (data: SignInType) => void;
  initialize: () => void;
  getCurranUser: (accessToken: string | undefined) => void;
  logout: () => void;
}

export interface IPermissions {
  open: boolean;
  file: File | null;
  fileError: string;
  selectedUsers: { permissionById: string; permissionByEmail: string }[];
  checked: string | null;
  uploadedFile: null;
  axiosError: string | null;
  resStatus: number | null;
  showUsers: boolean;
  extension: string | null;

  setExtension: (extension: string | null) => void;
  setOpen: (open: boolean) => void;
  setFile: (file: File | null) => void;
  setFileError: (fileError: string) => void;
  setSelectedUsers: (
    selectedUsers: { permissionById: string; permissionByEmail: string }[]
  ) => void;
  setChecked: (checked: string | null | SetStateAction<string | null>) => void;
  setShowUsers: (showUsers: boolean) => void;
  setUploadedFile: (uploadedFile: null) => void;
  setResStatus: (resStatus: number | null) => void;
  handleUserSelection: (
    userId: string,
    email: string,
    isChecked: boolean
  ) => void;
  uploadFile: () => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  initializeState: () => void;
}

export interface IDetailsPage {
  selected: string | null;
  selectedPermission: PermissionType[] | undefined;
  axiosError: string;
  deletedUser: IUser | null;
  isLoading: boolean;
  setDeletedUser: (deletedUser: IUser | null) => void;
  resStatus: number;
  setResStatus: (resStatus: number) => void;
  setIsLoading: (isLoading: boolean) => void;
  setSelected: (selected: string | null) => void;
  setSelectedPermission: (permission: PermissionType[] | undefined) => void;
  deleteFile: (id: string) => void;
  getSelectedPermission: (id: string) => void;
  updatePermissions: (permissionId: string, checked: boolean) => void;
  deleteFileUser: (id: string) => void;
  handleDownload: (Id: string) => void;
}
