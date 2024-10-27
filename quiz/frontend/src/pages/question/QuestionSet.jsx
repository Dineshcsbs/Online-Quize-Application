import React from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Card from '../../components/Card'
import { QuestionSetSchema } from '../../constant/Schema/QuestionSetSchema';
import { QUESTION } from '../../constant/globalData/UserData';
import Input from '../../components/Input';
import Label from '../../components/Label';
import Button from '../../components/Button';
import { useCreateQuestionSetMutation } from '../../service/QuestionService';
import { useNavigate } from 'react-router-dom';

const QuestionSet = () => {
    const navigate=useNavigate();
  const [questionSetData, {isSuccess: questionSetDataSuccessful}]=useCreateQuestionSetMutation();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(QuestionSetSchema),
      });
    //   console.log("inside component");
      
      const submit = async (data) => {
        try {
            const formData = new FormData();
            formData.append("subject", data.subject);
            formData.append("image", data.image[0]);
            formData.append("choise", data.choise);
            

            const response = await questionSetData(formData); 
            // console.log(response?.data?.data);
            navigate("/question-create", { state: { data: response?.data?.data } });

        } catch (e) {
            console.error('Submission failed:', e);
            alert('Failed to create question set. Please try again.');
        }
    };
    
    

  return (
    <Card className="card bg-primary bg-opacity-10 vh-100 border-0">
        <h4 className="text-center mt-4">Question Set Create</h4>
        <Card className='mx-auto col-12 col-md-8 col-lg-5 bg-secondary bg-opacity-10 rounded-3 mt-4 border-0 p-3'>
        <form onSubmit={handleSubmit(submit)}>
            {Object.entries(QUESTION).map(([key, [label, type]]) => (
                <div className='row my-3' key={key}>
                    <Label className='col-12 col-md-4 text-md-center'>{label}:</Label>
                    <div className='col-7'>
                        {type === 'radio' ? (
                            <>
                                <Input type='radio' register={register(key)} value={false} className='me-2' /> Assignment<br />
                                <Input type='radio' register={register(key)} value={true} className='me-2' /> Practice<br />
                                {errors[key] && <span className='text-danger'>This field is required</span>}
                            </>
                        ) : (
                            <>
                                <Input
                                    type={type}
                                    register={register(key)}
                                    className='rounded-3 p-1 col-10 bg-white bg-opacity-75 border-1'
                                /><br />
                                {errors[key] && <span className='text-danger'>This field is required</span>}
                            </>
                        )}
                    </div>
                </div>
            ))}
            <div className='d-flex justify-content-center'>
                <Button type={'submit'} children={'Create'} className={'btn bg-primary'} />
            </div>
        </form>
        </Card>

    </Card>
  )
}

export default QuestionSet
