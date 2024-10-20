import * as Yup from "yup";

export const SignUpSchema = Yup.object().shape({
  name: Yup.string().required("name required"),
  email: Yup.string().required("email required"),
  password: Yup.string()
    .required("password is required")
    .min(4, "min 4 character")
    .max(15, "max 15 character"),
  age: Yup.number().required("age required").min(10, "age greater then 10").typeError("age required "),
  designition: Yup.string().required("atleast one designition selected"),
});
