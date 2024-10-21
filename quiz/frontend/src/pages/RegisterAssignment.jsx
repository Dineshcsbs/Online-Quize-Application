import React from "react";
import CommonTest from "../components/CommonTest";
import { useRegisterAssignmentTestQuery } from "../service/LoginService";

const RegisterAssignment = () => {
  const SearchTestData = (search, searchCurrentPageNo) => {
    const {
      data: searchTest,
      error,
      isLoading,
    } = useRegisterAssignmentTestQuery({ search, searchCurrentPageNo });
    // console.log(searchTest?.content);
    
    return { searchTest, error, isLoading };
  };

  return (
    <div>
      <CommonTest searchFunction={SearchTestData} status={"register Assignment"} />
    </div>
  );
};

export default RegisterAssignment;
