import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { QuestionSchema } from "../../constant/Schema/QuestionSchema";
import Card from "../../components/Card";
import Input from "../../components/Input";
import Label from "../../components/Label";
import TextArea from "../../components/TextArea";
import Button from "../../components/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useCountQuestionQuery, useCreateQuestionMutation } from "../../service/QuestionService";
import { toast } from "react-toastify";

const QuestionCreate = () => {
  const navigate = useNavigate();
  const questionSetId=useLocation()?.state?.data;
  const {data:questionNo}=useCountQuestionQuery(questionSetId?.id);
  const [createQuestion]=useCreateQuestionMutation();
  const questionField = ['question', 'option1', 'option2', 'option3', 'option4', 'ans'];
  const buttonField = ['Exit', 'Submit', 'Reset'];
  console.log(questionSetId);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(QuestionSchema),
  });

  const submit = async (data) => {
    data.questionSet=questionSetId;
    data.answer = data[`option${data.answer}`];
    // console.log(data);
    const response=await createQuestion(data);
    // console.log(response);
    toast.success(response?.data?.message)
    reset();
  };

  const handleReset = () => {
    reset();
  };
  if(questionSetId?.subject===undefined){
    return <div className="text-center mt-5 text-danger">Please Select the Question Set!</div>
  }

  return (
    <Card className="card bg-primary bg-opacity-10 vh-100 border-0">
      <h4 className="text-center mt-4">Question Create</h4>
      <Card className='mx-auto col-12 col-lg-7 bg-secondary bg-opacity-10 rounded-3 mt-4 border-0 px-3'>
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between">
          <h6 className='col-11 col-md-3  mt-4 ms-0 ms-md-3 ms-lg-0 ms-xl-4 '>Question : {questionNo?.data+1}</h6>
          <h4 className="text-md-start text-center col-12 col-md-6 mt-3">{questionSetId?.subject}</h4>
        </div>
        <form onSubmit={handleSubmit(submit)} className=" py-4">
          {questionField.map((item) => (
            <div key={item} className="row align-items-center  mb-3">
              
              <Label className='col-12 col-md-2 text-md-center'>
                {item.charAt(0).toUpperCase() + item.slice(1)} :
              </Label>
              {item === 'ans' ? (
                <div className="col-12 col-md-9">
                  {errors['answer'] && (
                    <p className="text-danger p-0">&#9888; {errors['answer']?.message}</p>
                  )}
                  <Input
                    type='number'
                    register={register('answer')}
                    className='form-control rounded-3 p-2 bg-white bg-opacity-75 border-1'
                  />
                </div>
              ) : (
                <div className="col-12 col-md-9">
                  {errors[item==='question'?'questionDescription':item] && (
                    <p className="text-danger p-0">&#9888; {errors[item==='question'?'questionDescription':item]?.message}</p>
                  )}
                  <TextArea
                    className='form-control rounded-3 p-2 bg-white bg-opacity-75 border-1'
                    register={register(item==='question'?'questionDescription':item)}
                    type='text'
                    style={{ height: '50px' }}
                  />
                </div>
              )}
            </div>
          ))}
          <div className="d-flex justify-content-center my-4">
            {buttonField.map(item => (
              item === 'Submit' ? (
                <Button
                  key={item}
                  type="submit"
                  className="btn bg-secondary bg-opacity-75 fw-bold text-white mx-2"
                  style={{ minWidth: '80px' }}
                >
                  {item}
                </Button>
              ) : (
                <Input
                  key={item}
                  className="btn bg-primary mx-2"
                  type="button"
                  onClick={() => { item === 'Exit' ? navigate("/dashboard") : handleReset(); }}
                  value={item}
                  style={{ minWidth: '80px' }}
                />
              )
            ))}
          </div>
        </form>
      </Card>
    </Card>
  );
};

export default QuestionCreate;
