import React, { useState } from "react";
import { useUserInformationQuery } from "../../service/ProfileService";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported
import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "react-router-dom";

const User = () => {
  const [search, setSearch] = useState("");
  const [searchCurrentPageNo,setSearchCurrentPageNo]=useState(0);
  const { data: userInfo, isLoading } = useUserInformationQuery({ search, searchCurrentPageNo });
  const navigate=useNavigate();

const handleKeyDown = (event) => {
  if (event.target.value !== null) setSearch(event.target.value);
  setSearchCurrentPageNo(0);
};
  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  const pageNoClick =(value)=>{
    if(value===1)setSearchCurrentPageNo(searchCurrentPageNo+1);
    else if(searchCurrentPageNo!==0) setSearchCurrentPageNo(searchCurrentPageNo-1);

}
  if (!userInfo || !userInfo?.data?.content || !Array.isArray(userInfo?.data?.content)) {
    return (
      <div className="text-center text-danger">
        No user information available.
      </div>
    );
  }

  return (
    <div className="bg-secondary vh-100 p-4 bg-opacity-25">
      <div className="col-10 mx-auto h-75">
        <div className="d-flex justify-content-end">
        <div
          className="bg-white rounded-3  p-1 "
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
        </div>
        <div className="mt-3">
        <table className="table table-striped table-bordered">
          <thead className="table-light">
            <tr>
              <th>SNO</th>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {userInfo?.data?.content?.map((item, index) => (
              <tr key={item.id || index}>
                <td>{userInfo?.data?.size*searchCurrentPageNo +index+1}</td>
                <td onClick={()=>navigate('/user-info',{ state: { id: item?.id } })}>{item?.name}</td>
                <td>{item?.phoneNumber}</td>
                <td>{item?.userCredential?.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
      <div className="d-flex justify-content-center mt-4">
            {userInfo?.data?.content.length!==0?
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className={`${userInfo?.data?.pageable?.pageNumber===0?"disabled":""}`} onClick={()=>pageNoClick(-1)}>
                <a className="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li className="page-item"><a className="page-link" href="#">{userInfo?.data?.pageable?.pageNumber+1}</a></li>
              <li className={` ${userInfo?.data?.totalPages===searchCurrentPageNo+1 ? 'disabled' : ''} `}>
                <a className="page-link" href="#" aria-label="Next" onClick={()=>pageNoClick(1)}>
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>:""}
          </div>
    </div>
  );
};

export default User;
