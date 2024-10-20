import React,{ useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  useAvailableTestQuery,
  useTestRegisterMutation,
} from "../service/LoginService";
import Modal from "../components/Modal";


const RegisterTest = () => {
  const { data: availableTest, error } = useAvailableTestQuery();
  const [register] = useTestRegisterMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectPackage, setSelectPackage] = useState();

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
     <ToastContainer/>
      <h4 className="text-center text-primary my-5">Available Test</h4>
      <div className="row g-3 mx-1 mx-lg-3">
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
      </Modal>
    </div>
  );
};

export default RegisterTest;
