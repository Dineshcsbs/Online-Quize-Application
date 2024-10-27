import * as Yup from "yup";

export const QuestionSchema = Yup.object().shape({
  questionDescription: Yup.string().required("Question required"),
  option1: Yup.string().required("Option1 is required"),
  option2: Yup.string().required("Option2 is required"),
  option3: Yup.string().required("Option3 is required"),
  option4: Yup.string().required("Option4 is required"),
  answer: Yup.number()
    .oneOf([1, 2, 3, 4], "Answer must be 1, 2, 3, or 4")
    .required("Ans is Required"),
});
