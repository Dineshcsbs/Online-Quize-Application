import * as Yup from "yup";

export const UpdateSchema = Yup.object().shape({
  name: Yup.string().required("name required"),
  age: Yup.number().required("age required").min(10, "age greater then 10").typeError("age required "),
  designition: Yup.string().required("atleast one designition selected"),
  phoneNumber: Yup.string().required("number is required"),
  gender: Yup.string().required("Gender is required"),

});
