import React from 'react'
import { useRegisterPracticeTestQuery } from '../service/LoginService';
import CommonTest from '../components/CommonTest';

const RegisterPractice = () => {
    const SearchTestData = (search, searchCurrentPageNo) => {
        const {
          data: searchTest,
          error,
          isLoading,
        } = useRegisterPracticeTestQuery({ search, searchCurrentPageNo });
        
        return { searchTest, error, isLoading };
      };
  return (
    <div>
      <CommonTest searchFunction={SearchTestData} status={"register Practice"} />
    </div>
  )
}

export default RegisterPractice
