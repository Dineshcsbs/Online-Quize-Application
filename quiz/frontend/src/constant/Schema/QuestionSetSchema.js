import * as Yup from "yup";

export const QuestionSetSchema = Yup.object().shape({
  subject: Yup.string().required("Subject required"),
  image: Yup.mixed().required("Image is required"),
  practice: Yup.string().required("REquired Choise"),
});
