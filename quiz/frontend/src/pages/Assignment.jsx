import React from "react";
import CommonTest from "../components/CommonTest";
import {
  useSearchActiveTestQuery,
} from "../service/LoginService";

const Assignment = () => {
  const SearchTestData = (search,searchCurrentPageNo) => {
    const {
      data: searchTest,
      error,
      isLoading,
    } = useSearchActiveTestQuery({search,searchCurrentPageNo});
    // console.log(search+ "    45    "+searchCurrentPageNo);
    return { searchTest, error, isLoading };
  };

  // const PageTestData = (pageNo) => {
  //   const {
  //     data: pageData,
  //     error: errors,
  //     isLoading,
  //   } = usePageActiveTestQuery(pageNo === null ? 0 : pageNo);
  
  //   return { pageData, errors, isLoading };
  // };

  return (
    <div>
      <CommonTest searchFunction={SearchTestData} status={"active"}/>
    </div>
  );
};

export default Assignment;