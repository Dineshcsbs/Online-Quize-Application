import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePendingTestQuery, useTestCompletedQuery } from "../../service/TestService";
import { useAverageMarkQuery } from "../../service/LoginService";
import { useAvailablePracticeQuery } from "../../service/PracticeService";
import { USER_DASHBOARD, ADMIN_DASHBOARD, ADMIN_IMAGE, USER_DASHBOARD_IMAGE_DATA, DASHBOARD_COLOR } from "../../constant/globalData/UserData";

const DashBoard = () => {
  const { data: testComplete } = useTestCompletedQuery();
  const { data: averageMark } = useAverageMarkQuery();
  const { data: availablePracticeTest } = useAvailablePracticeQuery();
  const { data: pendingTest } = usePendingTestQuery();

  const [dashBoardData, setDashBoardData] = useState([]);
  const [dashBoardImage, setDashBoardImage] = useState([]);
  const [dashBoardValue, setDashBoardValue] = useState([]);
  const [tempRole, setTempRole] = useState(localStorage.getItem('role'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (testComplete && averageMark && availablePracticeTest && pendingTest) {
      setDashBoardValue([
        testComplete.data || 0,
        availablePracticeTest.data || 0,
        pendingTest.data || 0,
        averageMark.data || 0
      ]);

      if (tempRole === 'ADMIN') {
        setDashBoardData(ADMIN_DASHBOARD);
        setDashBoardImage(ADMIN_IMAGE);
      } else {
        setDashBoardData(USER_DASHBOARD);
        setDashBoardImage(USER_DASHBOARD_IMAGE_DATA);
      }

      setLoading(false); // Stop loading once data is fully loaded
    }
  }, [testComplete, averageMark, availablePracticeTest, pendingTest, tempRole]);

  const navigate = useNavigate();

  const handleClick = (value) => {
    if (value === 1) {
      navigate(tempRole === 'USER' ? "/completed" : "/question-set");
    }
    if (value === 2) {
      navigate(tempRole === 'USER' ? "/practice" : "/question-set-page");
    }
    if (value === 3) {
      navigate(tempRole === 'USER' ? "/assignment" : "/user");
    }
  };

  if (loading) {
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center">
        <h3>Loading...</h3>
      </div>
    );
  }

  return (
    <div className="bg-secondary bg-opacity-10 card border-0 rounded-0 vh-100">
      <div className="mx-sm-3 mx-md-5 mx-xxl-5 mx-3 mt-sm-3 mt-lg-5 mt-3">
        <div className="card">
          <div className="mx-4 mt-5 mb-4">
            <h4>{localStorage.getItem('name')}</h4>
            <h3>Welcome to Our Application</h3>
          </div>
        </div>
        <h4 className="mt-5 mb-4">Your Dashboard</h4>

        <div className="row g-3 g-lg-5 mx-1 mx-lg-3 d-flex justify-content-around">
          {dashBoardData.map((item, key) => (
            <div key={key} className="col-12 col-md-6 col-lg-3" onClick={() => handleClick(key + 1)} style={{ cursor: "pointer" }}>
              <div className="bg-white rounded-3 card border-0">
                <div className={`bg-${DASHBOARD_COLOR[key]} rounded-top-3`} style={{ height: "8px" }}></div>
                {tempRole === 'ADMIN' ? (
                  <div className="card col-12 text-end border-0">
                    <img src={dashBoardImage[key]} alt="" width="100%" height="60" />
                  </div>
                ) : (
                  <div className="row mt-3 mx-3">
                    <div className="col-6">
                      <h5>{dashBoardValue[key]}</h5>
                    </div>
                    <div className="col-6 text-end">
                      <img src={dashBoardImage[key]} alt="" width="50" height="50" className="rounded-3" />
                    </div>
                  </div>
                )}
                <div className="fw-bold text-center my-3">{item}</div>
              </div>
            </div>
          ))}
          <p className="mt-5 d-flex justify-content-start">
            New Test Available
            <span className="text-primary ms-1" onClick={() => navigate("/register")} style={{ cursor: 'pointer' }}>here</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
