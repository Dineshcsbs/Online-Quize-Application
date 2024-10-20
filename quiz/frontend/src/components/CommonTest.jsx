import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

const CommonTest = ({ searchFunction ,status}) => {

  const [searchCurrentPageNo,setSearchCurrentPageNo]=useState(0);
  // const status="active";


  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectPackage, setSelectPackage] = useState();
  const [packages, setPackages] = useState();
  const [search, setSearch] = useState("");

  const { searchTest, error } = searchFunction(search,searchCurrentPageNo); 

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
    setSelectPackage(data?.questionSet?.subject);
    setIsModalOpen(true);
  };

  const startTest = () => {
    navigate(
      status === "active" || status === "practice" ? "/test" : "/answer",
      {
        state:
          status === "active" || status === "practice"
            ? packages?.id
            : packages?.questionSet?.id,
      }
    );
    setIsModalOpen(false);
  };

  return (
    <div className="bg-secondary bg-opacity-10 card border-0 rounded-0 vh-100">
      <div className="mx-sm-3 mx-md-5 mx-xxl-5 mx-3 mt-sm-3 mt-lg-5 mt-3">
        <div className="card">
          <div className="mx-4 mt-4 mb-4 ">
            <h4 className="text-primary">
              {status === "active"
                ? "Assignment Page"
                : status === "practice"
                ? "Practice Page"
                : "Answer View"}
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
             {searchTest?.content?.map((data) => (
              <div
                key={data.id}
                className="col-12 col-md-6 col-lg-3"
                onClick={() => handleConform(data)}
              >
                <div className="bg-white rounded-3 card border-0 mb-4">
                  <div
                    className="bg-primary rounded-top-3"
                    style={{ height: "8px" }}
                  ></div>
                  <div className="row mt-3 mx-3">
                    <div className="col-6">
                      <h5>{data?.questionSet?.subject}</h5>
                    </div>
                    <div className="col-6 text-end">
                      {data?.question?.image && (
                        <img
                          src={data.question.image}
                          alt=""
                          width="50"
                          height="50"
                          className="rounded-3"
                        />
                      )}
                    </div>
                  </div>
                  <div className="fw ms-4 my-3">
                    {status === "completed"
                      ? `Mark Score: ${data?.mark}`
                      : `Basic Level ${data?.questionSet?.subject}`}
                  </div>
                </div>
              </div>
            ))} 
          </div>
          <div className="d-flex justify-content-center mt-4">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className={`${searchTest?.pageable?.pageNumber===0?"disabled":""}`} onClick={()=>pageNoClick(-1)}>
                <a className="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li className="page-item"><a className="page-link" href="#">{searchTest?.pageable?.pageNumber+1}</a></li>
              <li className={` ${searchTest?.totalPages===searchCurrentPageNo+1 ? 'disabled' : ''} `}>
                <a className="page-link" href="#" aria-label="Next" onClick={()=>pageNoClick(1)}>
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
          </div>
        </div>
        
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={startTest}
        title={`${selectPackage} Package`}
        buttonName={`${
          status === "active" || status === "practice" ? "Start" : "Answer"
        } `}
      >
        <p>
          {`${
            status === "active" || status === "practice"
              ? "Are you ready for "
              : "Do you want to see the answer?"
          }`}
          <span className="fw-bold">{selectPackage}</span>{" "}
          {`${status === "active" || status === "practice" ? "test?" : ""}`}
        </p>
      </Modal>
      
    </div>
  );
};

export default CommonTest;
