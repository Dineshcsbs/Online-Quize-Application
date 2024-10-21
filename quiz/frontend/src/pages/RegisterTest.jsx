import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import practiceImg from "../assets/practiceImg.png";
import testImg from "../assets/testImg.png";
import {
  useAvailableTestQuery,
  useTestRegisterMutation,
} from "../service/LoginService";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";

const RegisterTest = () => {
  const navigate=useNavigate();
  const { data: availableTest, error } = useAvailableTestQuery();
  // console.log(availableTest);

  const [register] = useTestRegisterMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectPackage, setSelectPackage] = useState();
  const [availableData, setAvailableData] = useState([]);
  useEffect(() => {
    if (availableTest && availableTest.length >= 2 && availableTest[0].length >= 2) {
        setAvailableData([
            {
                image: testImg,
                heading: "Assignment Test",
                register: availableTest[0][0],
                available: availableTest[0][1],
            },
            {
                image: practiceImg,
                heading: "Practice Test",
                register: availableTest[1][0],
                available: availableTest[1][1],
            },
        ]);
    } else {
        console.warn("availableTest does not have the expected structure.");
        setAvailableData([]); 
    }
}, [availableTest]);

  if (error != null) {
    return <div>Error in our Page</div>;
  }

  const handleConform = (data) => {
    setSelectPackage(data);
    setIsModalOpen(true);
  };
  const handleSave = (data) => {
    register(data?.id);
    toast.success(`${data?.subject} added successfully!`, { autoClose: 500 });
    setIsModalOpen(false);
  };
  return (
    <div className={`vh-100 border-0 p-3 bg-secondary bg-opacity-10 `}>
      <ToastContainer />
      <h4 className="text-center text-primary mt-3">Available Test</h4 >
      <div className="row  d-flex justify-content-evenly  mt-3" >
        {availableData?.map((data) => (
          <div
            className="card col-11 col-md-5 col-lg-3 mt-4 bg-secondary bg-opacity-25  rounded-4 border-0"
            key={data?.heading} onClick={()=>navigate(data.heading==="Assignment Test"?"/register-assignment":"/register-test")}
          >
            <h4 className="text-center  mt-3">{data?.heading}</h4>
            <img
              src={data?.image}
              style={{ width: "96%", height: "60%" }}
              className="ms-2 ms-xl-2 mt-2 mt-lg-3 rounded-3"
            ></img>
            <h6 className="mt-4 ms-2 ms-xl-3">
              Total Register Test &nbsp;: {data.register}
            </h6>
            <h6 className="mt-2 mb-3 ms-2 ms-xl-3">
              Available test
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{" "}
              {data.available}
            </h6>
          </div>
        ))}
        {/* <div className="card col-11 col-md-5 col-lg-4  bg-secondary bg-opacity-25  rounded-4 ">
          <h4 className="text-center  mt-3">Assignment Test</h4>
          <img src={practiceImg}  style={{ width: '94%', height: '60%' }}  className="ms-2 ms-xl-3 mt-4 rounded-3"></img>
          <h6 className="mt-4 ms-2 ms-xl-3">Total Regiser Test :</h6>
          <h6 className="mt-2 mb-3 ms-2 ms-xl-3">Available test :</h6>
        </div> */}
        {/* <div className="col-11 col-md-5 mt-3 mt-md-0 col-lg-4 bg-secondary bg-opacity-25  rounded-4">
        <h4 className="text-center  mt-3">Assignment Test</h4>
          <img src={testImg}  style={{ width: '94%', height: '60%' }}  className="ms-2 ms-xl-3 mt-4 rounded-3"></img>
          <h6 className="mt-4 ms-2 ms-xl-3">Total Regiser Test :</h6>
          <h6 className="mt-2 mb-3 ms-2 ms-xl-3">Available test :</h6>
        </div> */}
      </div>
      {/* <div className="row g-3 mx-1 mx-lg-3">
        {availableTest?.map((data, item) => (
          <div className="col-12 col-md-6 col-lg-3 " key={data?.id}>
            <div
              className={`bg-${
                item % 2 === 0 ? "primary" : "success"
              } rounded-top-3`}
              style={{ height: "8px" }}
            ></div>
            <div
              className=" bg-white rounded-3 p-2"
              onClick={() => handleConform(data)}
              style={{ cursor: "pointer" }}
            >
              <div className="row mt-3 mx-3 ">
                <div className="col-6">
                  <h5>{data?.subject}</h5>
                </div>
                <div className="col-6 text-end">
                  <img
                    src={""}
                    alt=""
                    width="50"
                    height="50"
                    className="rounded-3"
                  />
                </div>
              </div>
              <div className="fw-bold text-center my-3">Basic Level</div>
            </div>
          </div>
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={() => handleSave(selectPackage)}
        title="Selected Package"
        buttonName={"Add"}
      >
        <p>
          Are you sure you want to add{" "}
          <spam className="fw-bold">{selectPackage?.subject}</spam>?
        </p>
      </Modal> */}
    </div>
  );
};

export default RegisterTest;
