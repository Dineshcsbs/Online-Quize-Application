import React from "react";
import AvgMArk from "../assets/AvgMark.png";
import PracticeTest from "../assets/PracticeTest.png";
import TestComplete from "../assets/TestComplete.png";
import TestPending from "../assets/TestPending.png";
import { useAvailablePracticeQuery, useAverageMarkQuery, usePendingTestQuery, useTestCompletedQuery } from "../service/LoginService";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
const DashBoard = () => {
  // const { data: test } = useTestUserQuery();
  const {data:testComplete} = useTestCompletedQuery();
  const {data:averageMark}=useAverageMarkQuery();
  const {data:availablePracticeTest}=useAvailablePracticeQuery()
  // const { data: activeTest } = useTestUserQuery();
  const {data:pendingTest}=usePendingTestQuery();

  const navigate = useNavigate();
  const handleClick=(value)=>{
// console.log(test+" ds,d,l");

    if(value===1){
      // const status="completed";
      // const result=testComplete;
      navigate("/completed");
      // navigate("/completed",{ state: {result,status} })
    }
    if(value===2){
      // const status="practice"
      // const result=availablePracticeTest;
      navigate("/practice");
    }
    if(value===3){
      // const result=pendingTest;
      // const status="active"
      navigate("/assignment");
    }
   
  }
  return (
    <div
      className="bg-secondary bg-opacity-10 card border-0 rounded-0 vh-100"
    >
      <div className="mx-sm-3 mx-md-5 mx-xxl-5 mx-3 mt-sm-3 mt-lg-5 mt-3">
        <div className="card">
          <div className="mx-4 mt-5 mb-4 ">
            {<h4>{localStorage.getItem('name')}</h4>}
            <h3>Welcome to Our Application</h3>
          </div>
        </div>
        <h4 className="mt-5 mb-4">Your Dashboard</h4>

        <div className="row g-3 g-lg-5 mx-1 mx-lg-3">
          <div
            className="col-12 col-md-6 col-lg-3"
            onClick={() => handleClick(1)}
            style={{ cursor: "pointer" }}
          >

            <div className="bg-white rounded-3 card border-0">
              <div
                className="bg-primary rounded-top-3"
                style={{ height: "8px" }}
              ></div>
              <div className="row mt-3 mx-3">
                <div className="col-6">

                  <h5>{testComplete && testComplete.length}</h5>
                </div>
                <div className="col-6 text-end">
                  <img
                    src={TestComplete}
                    alt=""
                    width="50"
                    height="50"
                    className="rounded-3"
                  />
                </div>
              </div>
              <div className="fw-bold text-center my-3">Test Completed</div>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-3" onClick={() => handleClick(2)}
            style={{ cursor: "pointer" }}>

            <div className="bg-white rounded-3 card border-0 ">
              <div
                className="bg-success    rounded-top-3"
                style={{ height: "8px" }}
              ></div>
              <div className="row mt-3 mx-3">
                <div className="col-6">
                  <h5>{availablePracticeTest && availablePracticeTest.length}</h5>
                </div>
                <div className="col-6 text-end">
                  <img
                    src={PracticeTest}
                    alt=""
                    width="50"
                    height="50"
                    className="rounded-3"
                  />
                </div>
              </div>
              <div className="fw-bold text-center my-3">Practice Test</div>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-3" onClick={() => handleClick(3)}>
            <div className="bg-white rounded-3 card border-0">
              <div
                className="bg-danger  rounded-top-3"
                style={{ height: "8px" }}
              ></div>
              <div className="row mt-3 mx-3">
                <div className="col-6">
                  <h5>{pendingTest && pendingTest.length}</h5>
                </div>
                <div className="col-6 text-end">
                  <img
                    src={TestPending}
                    alt=""
                    width="50"
                    height="50"
                    className="rounded-3"
                  />
                </div>
              </div>
              <div className="fw-bold text-center my-3">Assignment Pending</div>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-3" onClick={() => handleClick(4)}>
            <div className="bg-white rounded-3 card border-0">
              <div
                className="bg-primary rounded-top-3"
                style={{ height: "8px" }}
              ></div>
              <div className="row mt-3 mx-3">
                <div className="col-6">
                  <h5>{averageMark?.toFixed(2)}</h5>
                </div>
                <div className="col-6 text-end">
                  <img
                    src={AvgMArk}
                    alt=""
                    width="50"
                    height="50"
                    className="rounded-3"
                  />
                </div>
              </div>
              <div className="fw-bold text-center my-3">
                Avg Assignment Mark
              </div>
            </div>
          </div>
      <spam className='mt-5'>New Test Available {<spam className={`text-primary`} onClick={()=>navigate("/register")} style={{ cursor: 'pointer' }}>here</spam>}</spam>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
