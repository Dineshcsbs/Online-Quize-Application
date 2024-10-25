import React from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Card from '../../components/Card'
import { QuestionSetSchema } from '../../constant/Schema/QuestionSetSchema';
import { QUESTION } from '../../constant/globalData/UserData';
import Input from '../../components/Input';
import Label from '../../components/Label';
import Button from '../../components/Button';

const QuestionSet = () => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(QuestionSetSchema),
      });
      const submit=(data)=>{
console.log(data);

      }

  return (
    <Card className="card bg-primary bg-opacity-10 vh-100 border-0">
        <h4 className="text-center mt-4">Question Set Create</h4>
        <Card className='mx-auto col-12 col-lg-6 bg-secondary bg-opacity-10 rounded-3 mt-4 border-0 p-3'>
            <form onSubmit={handleSubmit(submit)} >
              {QUESTION.map((item,key)=>(
                <>
                <div className='row my-3 '>
                <Label className='col-12 col-md-3 text-md-center '>
                {item} :
              </Label>
                <Input type={'text'} register={register(item) }  className=' col-8 rounded-3 p-1 bg-white bg-opacity-75 border-1' />
                </div>
               
                </>
              ))}
              <div className='d-flex justify-content-center'>

              <Button children={'Create'} className={'btn bg-primary '}/>
              </div>
            </form>
        </Card>

    </Card>
  )
}

export default QuestionSet
