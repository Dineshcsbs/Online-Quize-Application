import React from 'react'
import { useQuestionSetSearchQuery } from '../../service/QuestionService';
import CommonTest from '../../components/CommonTest';


const QuestionSetPage = () => {
    // const []

    const SearchTestData = (search, searchCurrentPageNo) => {
        const {
          data: searchTest,
          error,
          isLoading,
        } = useQuestionSetSearchQuery({ search, searchCurrentPageNo });
     
        return { searchTest, error, isLoading };
      };

  return (
    <div>
      <CommonTest searchFunction={SearchTestData} status={"Question Set"} />
    </div>
  )
}

export default QuestionSetPage
