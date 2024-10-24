import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { toast, ToastContainer } from "react-toastify";
import mineType from "../../src/constant/Schema/mediaType/MimeType"
import { useTestRegisterMutation } from "../service/TestService";

const CommonTest = ({ searchFunction ,status}) => {

  const [searchCurrentPageNo,setSearchCurrentPageNo]=useState(0);
  // const status="active";


  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectPackage, setSelectPackage] = useState();
  const [packages, setPackages] = useState();
  const [search, setSearch] = useState("");

  const { searchTest, error } = searchFunction(search,searchCurrentPageNo); 
  const [register] = useTestRegisterMutation();

  const handleKeyDown = (event) => {
      if (event.target.value !== null) setSearch(event.target.value);
      setSearchCurrentPageNo(0);
  };
  const pageNoClick =(value)=>{
      if(value===1)setSearchCurrentPageNo(searchCurrentPageNo+1);
      else if(searchCurrentPageNo!==0) setSearchCurrentPageNo(searchCurrentPageNo-1);

  }

  const handleConform = (data) => {
    setPackages(data);
    setSelectPackage( status.startsWith('register')?data?.subject:data?.questionSet?.subject);
    setIsModalOpen(true);
  };

  const startTest = () => {
    if( status.startsWith('register')){
      console.log(packages.id);
      
      handleSave(packages);
    }
    else{
    navigate(
      status === "active" || status === "practice" ? "/test" : "/answer",
      {
        state:
          status === "active" || status === "practice"
            ? packages?.id
            : packages?.questionSet?.id,
      }
    );
  }
    setIsModalOpen(false);
  };
  const handleSave = (data) => {
    register(data?.id);
    toast.success(`${data?.subject} added successfully!`, { autoClose: 500 });
    setIsModalOpen(false);
  };

  return (
    <div className="bg-secondary bg-opacity-10 card border-0 rounded-0 vh-100">
      <ToastContainer />
      <div className="mx-sm-3 mx-md-5 mx-xxl-5 mx-3 mt-sm-3 mt-lg-5 mt-3">
        <div className="card">
          <div className="mx-4 mt-4 mb-4 ">
            <h4 className="text-primary">
              {status === "active"
                ? "Assignment Page"
                : status === "practice"
                ? "Practice Page":
                status==='register Assignment'?"Register the Assignment"
                : status==='register Practice'?"Register the Practice":"Answer View"}
            </h4>
            <h3>Welcome to Our Application</h3>
          </div>
        </div>

        <div
          className="bg-white rounded-3 d-flex align-items-center p-1 mt-4"
          style={{ height: "35px", width: "289px" }}
        >
          <Icon
            icon="ion:search-sharp"
            width="24"
            height="24"
            className="mx-2"
          />
          <input
            type="text"
            className="border-0 flex-grow-1"
            placeholder="Search"
            onChange={handleKeyDown}
            style={{ height: "100%", outline: "none" }}
          />
        </div>

        <div className="bg-secondary bg-opacity-10 mt-3 rounded-2">
          <div className="d-flex flex-row ">
            <div className="p-2 ms-2 rounded-2">All</div>
            <div className="p-2 ms-2 rounded-2">Free</div>
            <div className="p-2 ms-2 rounded-2">Paid</div>
          </div>
          <hr className="mt-1" />
          <div className="row g-3 g-lg-5 mx-1 mx-lg-3">
              <div className="align-center">{searchTest?.data?.content.length===0?"No such element is found":""}</div>
             {searchTest?.data?.content?.map((data) => (
              
              <div
                key={data.id}
                className="col-12 col-md-6 col-lg-3"
                onClick={() => handleConform(data)}
                
              >
                {/* {console.log(data?.questionSet?.image)
                } */}
                <div className="bg-white rounded-3 card border-0 mb-4 " >
                  <div
                    className="bg-primary rounded-top-3"
                    style={{ height: "8px" }}
                  ></div>
                  <div className="row mt-3 mx-3">
                    <div className="col-6">
                      <h5>{status.startsWith('register')?data?.subject:data?.questionSet?.subject}</h5>
                    </div>
                    <div className="col-6 text-end">
                      {/* {console.log(data.image)
                        } */}
                      {data?.image||data?.questionSet?.image ? (
                      <img
                          src={`data:${mineType(`${status.startsWith('register')?data.image:data?.questionSet?.image}`.imageFormat)};base64,${status.startsWith('register')?data.image:data?.questionSet?.image}`}
                          alt="Image"
                          width="50"
                          height="50"
                          className="rounded-3"
                        />
                       ):<Icon icon="carbon:no-image" width="50" height="50" />} 
                    </div>
                  </div>
                  <div className="fw ms-4 my-3">
                    {status === "completed"
                      ? `Mark Score: ${data?.mark}`
                      : `Basic Level ${status.startsWith('register')?data?.subject:data?.questionSet?.subject}`}
                  </div>
                </div>
              </div>
            ))} 
          </div>
          <div className="d-flex justify-content-center mt-4">
            {searchTest?.data?.content.length!==0?
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className={`${searchTest?.data?.pageable?.pageNumber===0?"disabled":""}`} onClick={()=>pageNoClick(-1)}>
                <a className="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li className="page-item"><a className="page-link" href="#">{searchTest?.data?.pageable?.pageNumber+1}</a></li>
              <li className={` ${searchTest?.data?.totalPages===searchCurrentPageNo+1 ? 'disabled' : ''} `}>
                <a className="page-link" href="#" aria-label="Next" onClick={()=>pageNoClick(1)}>
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>:""}
          </div>
        </div>
        
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={startTest}
        title={`${selectPackage} Package`}
        buttonName={`${
          status === "active" || status === "practice" ? "Start" : status.startsWith('register')?"Add":"Answer"
        } `}
      >
        <p>
          {`${
            status === "active" || status === "practice"
              ? "Are you ready for "
              :  status.startsWith('register')?"Are you sure you add package?":"Do you want to see the answer?"
          }`}
          <span className="fw-bold">{selectPackage}</span>{" "}
          {`${status === "active" || status === "practice" ? "test?" : ""}`}
        </p>
      </Modal>
      
    </div>
  );
};

export default CommonTest;
