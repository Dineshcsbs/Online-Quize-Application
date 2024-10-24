import React from 'react'
import CommonTest from '../../components/CommonTest'
import { useSearchPracticeTestQuery } from '../../service/PracticeService';

const Practice = () => {
  // const CompletedData = (search) => {
  //   const {
  //     data: searchTest,
  //     error,
  //     isLoading,
  //   } = useSearchPracticeTestQuery(search);
  
  //   return { searchTest, error, isLoading };
  // };

  const SearchTestData = (search,searchCurrentPageNo) => {
    const {
      data: searchTest,
      error,
      isLoading,
    } = useSearchPracticeTestQuery({search,searchCurrentPageNo});
    return { searchTest, error, isLoading };
  };

  return (
    <div>
      <CommonTest searchFunction={SearchTestData} status={"practice"}/>
    </div>
  )
}

export default Practice
