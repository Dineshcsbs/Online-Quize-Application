import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  
  email: Yup.string().required("email required"),
  password: Yup.string()
    .required("password is required")
    .min(4, "min 4 character")
    .max(15, "max 15 character"),
});
