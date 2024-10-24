import React, { useState } from "react";
import CountdownTimer from "../Hooks";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useLocation, useNavigate } from "react-router-dom";
import { useMarkMutation } from "../../service/LoginService";
import { useQuestionSetQuery } from "../../service/LoginService";


const TestWindow = () => {
  const location = useLocation();
  const id = location.state;
  const navigate = useNavigate();
  const { data: questions } = useQuestionSetQuery(id);
  const [test] = useMarkMutation();
  const [page, setPage] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState({});

  if (!Array.isArray(questions?.data)) {
    return <div>Loading questions...</div>;
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions?.data.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const submitAnswer = async () => {
    try {
      const res1 = await test({ id, data: answer }); 
      navigate("/result", { state: res1 }); 
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };
  const handleTimerEnd = () => {
    submitAnswer(); 
};

  const currentQuestion = questions?.data[currentQuestionIndex];

  return (
    <div className="d-flex flex-column vh-100">
      <div className="flex-fill bg-secondary bg-opacity-25 p-5">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-8 col-md-8 bg-secondary bg-opacity-10 rounded-3 p-4">
              <div className="mb-4">
                <h5>
                  Question {currentQuestionIndex + 1} of {questions?.data.length}
                </h5>
                <hr />
                <h6>{currentQuestion?.question}</h6>
              </div>
              <div>
                {currentQuestion?.option?.map((item, index) => (
                  <div key={index} className="form-check mb-3">
                    <input
                      type="radio"
                      id={item}
                      name={`${currentQuestion?.questionId}`}
                      className="form-check-input"
                      checked={answer[currentQuestion?.questionId] === item}
                      onChange={() =>
                        setAnswer({
                          ...answer,
                          [currentQuestion?.questionId]: item,
                        })
                      }
                    />
                    <label htmlFor={item} className="form-check-label">
                      {item}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="col-lg-3 col-xl-2 col-md-4 bg-secondary bg-opacity-10 rounded-3 p-4 "
              style={{ height: "500px" }}
            >
              <h6 className="mb-4">
                Timer: <CountdownTimer onTimerEnd={handleTimerEnd} className="p-3" />
              </h6>
              <hr />
              <div className="row  " style={{ height: "75%" }}>
                {questions?.data
                  ?.slice(page * 21, (page + 1) * 21)
                  .map((_, index) => (
                    <div
                      key={index}
                      className="col-4 mb-2 d-flex justify-content-center"
                    >
                      <div
                        className={`text-dark rounded-circle d-flex align-items-center justify-content-center ${
                          Object.keys(answer).includes(
                            questions?.data[index + page * 21]?.questionId
                          )
                            ? currentQuestionIndex === index + page * 21
                              ? " bg-secondary bg-opacity-50 "
                              : " bg-success bg-opacity-50 "
                            : currentQuestionIndex === index + page * 21
                            ? " bg-white "
                            : "bg-primary bg-opacity-50"
                        }`}
                        style={{ height: "40px", width: "40px" }}
                        onClick={() =>
                          setCurrentQuestionIndex(index + page * 21)
                        }
                      >
                        {index + page * 21 + 1}
                      </div>
                    </div>
                  ))}
              </div>
              <div className="justify-content-between mt-3">
                {Array.from(
                  { length: Math.ceil(questions?.data.length / 21) },
                  (_, index) => (
                    <span
                      key={index}
                      onClick={() => setPage(index)}
                      className="pagination-button ms-2 "
                    >
                      <Icon
                        className={`${
                          page === index ? "bg-secondary " : ""
                        }rounded-pill`}
                        icon={`bi:${index + 1}-circle`}
                        width="24"
                        height="24"
                      />
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-secondary text-center py-3">
        <button
          className="btn btn-light mx-2"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>
        {currentQuestionIndex < questions?.data.length - 1 ? (
          <button className="btn btn-light mx-2" onClick={handleNext}>
            Next
          </button>
        ) : (
          <button className="btn btn-light mx-2" onClick={() => submitAnswer()}>
            Submit
          </button>
        )}
      </div>
      
    </div>
  );
};

export default TestWindow;