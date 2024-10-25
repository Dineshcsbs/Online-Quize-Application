import React, { useEffect, useState } from "react";
// import {PATH} from "../../util/index"
import { useNavigate } from "react-router-dom";
import { usePendingTestQuery, useTestCompletedQuery } from "../../service/TestService";
import { useAverageMarkQuery } from "../../service/LoginService";
import { useAvailablePracticeQuery } from "../../service/PracticeService";
import { USER_DASHBOARD } from "../../constant/globalData/UserData";
import { ADMIN_DASHBOARD } from "../../constant/globalData/UserData";
import { ADMIN_IMAGE } from "../../constant/globalData/UserData";
import { USER_DASHBOARD_IMAGE_DATA } from "../../constant/globalData/UserData";
import { DASHBOARD_COLOR } from "../../constant/globalData/UserData";


const DashBoard = () => {
  const {data:testComplete} = useTestCompletedQuery();
  const {data:averageMark}=useAverageMarkQuery();
  const {data:availablePracticeTest}=useAvailablePracticeQuery()
  const {data:pendingTest}=usePendingTestQuery();
  
  const [dashboaedData,setDashBoardData]=useState();
  const [dashboaedImage,setDashBoardImage]=useState();
  const [dashBoardValue,setDashBoardValue] =useState();
  useEffect(()=>{
    setDashBoardValue([testComplete?.data.length,availablePracticeTest?.data.length,pendingTest?.data.length,averageMark?.data]);
  },[testComplete,averageMark,availablePracticeTest,pendingTest])
  
  useEffect(()=>{
    if(localStorage.getItem('role')==='ADMIN'){
      setDashBoardData(ADMIN_DASHBOARD);
      setDashBoardImage(ADMIN_IMAGE)
    }
    else{
      setDashBoardData(USER_DASHBOARD);
      setDashBoardImage(USER_DASHBOARD_IMAGE_DATA)
    }
  },[])
  
  const navigate = useNavigate();
  const handleClick=(value)=>{

    if(value===1){
      navigate("/completed");
    }
    if(value===2){
      navigate("/practice");
    }
    if(value===3){
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
          {dashboaedData?.map((item,key)=>(
            <div
            className="col-12 col-md-6 col-lg-3"
            onClick={() => handleClick(key+1)}
            style={{ cursor: "pointer" }}
          >

            <div className="bg-white rounded-3 card border-0">
              <div
                className={`bg-${DASHBOARD_COLOR[key]} rounded-top-3`}
                style={{ height: "8px" }}
              ></div>
              {localStorage?.getItem('role')==='USER'?
              <div className="row mt-3 mx-3">
              <div className="col-6">

                <h5>{dashBoardValue[key]}</h5>
              </div>
              <div className="col-6 text-end">
                <img
                  src={dashboaedImage[key]}
                  alt=""
                  width="50"
                  height="50"
                  className="rounded-3"
                />
              </div>
            </div>
            :<div className="card col-12 text-end border-0">
                <img
                  src={dashboaedImage[key]}
                  alt=""
                  width="100%"
                  height="60"
                  // className=""
                />
            </div>
            }
              <div className="fw-bold text-center my-3">{item}</div>
            </div>
          </div>
          ))}

          {/* good */}

          {/* <div
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

                  <h5>{testComplete?.data && testComplete?.data.length}</h5>
                </div>
                <div className="col-6 text-end">
                  <img
                    src={PATH.IMAGE.TESTCOMPLETED}
                    alt=""
                    width="50"
                    height="50"
                    className="rounded-3"
                  />
                </div>
              </div>
              <div className="fw-bold text-center my-3">Test Completed</div>
            </div>
          </div> */}

          {/* <div className="col-12 col-md-6 col-lg-3" onClick={() => handleClick(2)}
            style={{ cursor: "pointer" }}>

            <div className="bg-white rounded-3 card border-0 ">
              <div
                className="bg-success    rounded-top-3"
                style={{ height: "8px" }}
              ></div>
              <div className="row mt-3 mx-3">
                <div className="col-6">
                  <h5>{availablePracticeTest?.data && availablePracticeTest?.data.length}</h5>
                </div>
                <div className="col-6 text-end">
                  <img
                    src={PATH.IMAGE.PRACTICETEST}
                    alt=""
                    width="50"
                    height="50"
                    className="rounded-3"
                  />
                </div>
              </div>
              <div className="fw-bold text-center my-3">Practice Test</div>
            </div>
          </div> */}

          {/* <div className="col-12 col-md-6 col-lg-3" onClick={() => handleClick(3)}>
            <div className="bg-white rounded-3 card border-0">
              <div
                className="bg-danger  rounded-top-3"
                style={{ height: "8px" }}
              ></div>
              <div className="row mt-3 mx-3">
                <div className="col-6">
                  <h5>{pendingTest?.data && pendingTest?.data.length}</h5>
                </div>
                <div className="col-6 text-end">
                  <img
                    src={PATH.IMAGE.TEST}
                    alt=""
                    width="50"
                    height="50"
                    className="rounded-3"
                  />
                </div>
              </div>
              <div className="fw-bold text-center my-3">Assignment Pending</div>
            </div>
          </div> */}

          {/* <div className="col-12 col-md-6 col-lg-3" onClick={() => handleClick(4)}>
            <div className="bg-white rounded-3 card border-0">
              <div
                className="bg-primary rounded-top-3"
                style={{ height: "8px" }}
              ></div>
              <div className="row mt-3 mx-3">
                <div className="col-6">
                  <h5>{averageMark?.data?.toFixed(2)}</h5>
                </div>
                <div className="col-6 text-end">
                  <img
                    src={PATH.IMAGE.AVGMARK}
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
          </div> */}
      <spam className='mt-5'>New Test Available {<spam className={`text-primary`} onClick={()=>navigate("/register")} style={{ cursor: 'pointer' }}>here</spam>}</spam>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
