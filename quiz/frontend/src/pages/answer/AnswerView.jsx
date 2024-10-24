import React from 'react'
import { useLocation } from "react-router-dom";
import { useRetriveAnswerQuery } from '../../service/LoginService';


const AnswerView = () => {
  const location = useLocation();
  const id = location.state;
  const { data: answer, error, isLoading } = useRetriveAnswerQuery(id);

  if (isLoading) {
    return<> <div className="text-center">Loading...</div></>;
  }

  if (error) {
    return (
      <div className="text-center text-danger">
        Error fetching answers {error.message}
      </div>
    );
  }

  if (!answer || Object.keys(answer?.data).length === 0) {
    return <div className="text-center">No answers available.</div>;
  }

  return (
    <div className=" bg-secondary bg-opacity-10">
      <div className="p-2 p-md-4 p-lg-5">
        {answer?.data?.map((data, key) => (
          <div key={data?.question?.id} className={`card  p-3 my-3 `}>
            <h6
              className={`${
                data?.ans === true ? "text-success " : "text-danger "
              }`}
            >
              {key + 1} .{data?.question?.questionDescription}
            </h6>

            <spam> Ans : {data?.question?.answer}</spam>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnswerView;
