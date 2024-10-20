import React from 'react'
import CommonTest from '../components/CommonTest'
import { useSearchCompletedTestQuery } from '../service/LoginService';

const CompletedTest = () => {
  // const CompletedData = (search) => {
  //   const {
  //     data: searchTest,
  //     error,
  //     isLoading,
  //   } = useSearchCompletedTestQuery(search);
  
  //   return { searchTest, error, isLoading };
  // };

  const SearchTestData = (search,searchCurrentPageNo) => {
    const {
      data: searchTest,
      error,
      isLoading,
    } = useSearchCompletedTestQuery({search,searchCurrentPageNo});
    return { searchTest, error, isLoading };
  };

  
  return (
    <div>
      <CommonTest searchFunction={SearchTestData} status={"completed"}/>
    </div>
  )
}

export default CompletedTest
