import React from 'react'
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import PieChart from "../components/PieChart";

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const markResult = location.state; 
  console.log(markResult);
  
  return (
    <div className="d-flex flex-column vh-100 bg-light">
      <div className="p-5 flex-grow-1 d-flex flex-column justify-content-between">
        <div className={` card p-3 mb-4 ${(markResult?.data?.correctAnswerPer>50)?"bg-success":"bg-danger"} bg-opacity-25`}>
          {markResult?.data?.correctAnswerPer>=50?<h5 >Great Job! You Passed the Test</h5>:<h5>Sorry to say, You fail the Test!</h5>}

        </div>
        
        <div className="row mt-5 p-3 justify-content-around">

          <div className="card col-12 col-md-3 rounded-4 mb-4">
            <div className="row mt-4">
              <div className="col">Your Score</div>
            </div>
            <div className="row">
              <div className="col-4 mt-4">{markResult?.data?.mark}</div>
              <div className="col-8">
                <PieChart x={markResult?.data?.correctAnswerPer} y={100-markResult?.data?.correctAnswerPer} color1={'#11f505'} color2={'#ffffff'}/>
              </div>
            </div>
            <hr />
            <h6>Pass Mark: {markResult?.data?.passMark}</h6>
          </div>

          <div className={`card col-12 col-md-3 rounded-4 mb-4 ${(markResult?.data?.correctAnswerPer>50)?"bg-success":""} bg-opacity-25`}>
            <div className="row  mt-4">
              <div className="col">Correct Answer</div>
            </div>
            <div className="row">
              <div className="col-4 mt-4">{markResult?.data?.correctAnswerPer}%</div>
              <div className="col-8">
                <PieChart x={markResult?.data?.correctAnswerPer} y={100-markResult?.data?.correctAnswerPer} color1={'#26a307'} color2={'#ffffff'}/>
              </div>
            </div>
            <hr />
            <h6 className="mb-3">Pass Percentage : 50%</h6>
          </div>
          <div className={`card col-12 col-md-3 rounded-4 mb-4 ${(markResult?.data?.correctAnswerPer<50)?"bg-danger":""} bg-opacity-25`}>
            <div className="row mt-4">
              <div className="col">Wrong Answer</div>
            </div>
            <div className="row">
              <div className="col-4 mt-4">{markResult?.data?.wrongAnswerPer}%</div>
              <div className="col-8">
                <PieChart x={100-markResult?.data?.correctAnswerPer} y={markResult?.data?.correctAnswerPer} color1={'#ff030f'} color2={'#ffffff'}/>
              </div>
            </div>
            <hr />
          </div>
        </div>

       
        <div className="p-5 d-flex justify-content-end">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/dashboard")}
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;