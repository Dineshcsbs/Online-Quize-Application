import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Icon } from "@iconify/react"; 
import { PATH } from "../util";
import mineType from "../../src/constant/mediaType/MimeType"
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useAvailablePracticeQuery } from "../service/PracticeService";
import { usePendingTestQuery } from "../service/TestService";
import { useUserDataQuery } from "../service/LoginService";
import { NAVBAR_ADMIN_DATA,NAVBAR_ADMIN_LINK,NAVBAR_USER_DATA,NAVBAR_USER_LINK } from "../constant/globalData/UserData";

const CustomNavbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { data: availablePracticeTest } = useAvailablePracticeQuery();
  const { data: pendingTest } = usePendingTestQuery();
  const { data: user } = useUserDataQuery();
  const [role,setRole]=useState();
  const [navBarData,setNavBarData]=useState([]);
  localStorage.setItem("name", user?.data?.name);
  localStorage.setItem("role",user?.data?.userCredential?.authority);
  
  useEffect(()=>{
    setRole(user?.data?.userCredential?.authority);
    if(user?.data?.userCredential?.authority==='ADMIN'){
      localStorage.setItem('TempRole',role)
    }
  },[user])
  useEffect(()=>{
    if(role==='USER'){
      setNavBarData([NAVBAR_USER_DATA,NAVBAR_USER_LINK])
    }
    else{
      setNavBarData([NAVBAR_ADMIN_DATA,NAVBAR_ADMIN_LINK])
    }
    if(user?.data?.userCredential?.authority==='ADMIN'){
      localStorage.setItem('TempRole',role)
    }
  },[role])

  const navigate = useNavigate();
  const handleNavbarToggle = () => {
    setNavbarOpen(!navbarOpen);
  };

  return (
    <Navbar expand="lg" bg="dark" className="py-2">
      <Container fluid>
        <Navbar.Brand href="#" className="fw-bold bg-dark text-white">
          <img
            src={PATH.IMAGE.LOGO}
            alt="Logo"
            className="rounded-circle"
            style={{ width: "40px", height: "40px" }}
          />
        </Navbar.Brand>
        <h4 className="text-center mb-1 text-secondary">Online Quize</h4>
        <button
          className="border-0 bg-light d-lg-none"
          onClick={handleNavbarToggle}
          aria-controls="navbar-content"
          aria-expanded={navbarOpen}
          aria-label="Toggle navigation"
        >
          {navbarOpen ? (
            <Icon
              icon="line-md:menu-to-close-transition"
              width="24"
              height="24"
            />
          ) : (
            <Icon icon="clarity:menu-line" width="24" height="24" />
          )}
        </button>

        <Navbar.Collapse
          id="navbar-content"
          className={navbarOpen ? "show" : ""}
        >
          <Nav className="ms-auto">

          {navBarData[0]?.map((item,index)=>(
            <Button
            className={"btn bg-dark text-white mb-1 border-0 me-5"}
            children={`${item}`}
            onClick={() => navigate(`${navBarData[1]?.[index]}`)}
          />
          ))}

            {/* {localStorage.getItem('role')==='ADMIN'?<Button
              className={"btn bg-dark text-white mb-1 border-0 me-5"}
              children="Question"
              onClick={() => navigate("/question-create")}
            />:""
            }
          

            <Button
              className={"btn bg-dark text-white mb-1 border-0 me-5"}
              children="DashBoard"
              onClick={() => navigate("/dashboard")}
            />
            <Button
              className={"btn bg-dark text-white mb-1 border-0 me-5"}
              children="Practice"
              onClick={() => {
                const status = "practice";
                const result = availablePracticeTest;
                navigate("/practice", { state: { result, status } });
              }}
            />
            <Button
              className={"btn bg-dark text-white mb-1 border-0 me-5"}
              children="Assignment"
              onClick={() => {
                const result = pendingTest?.data;
                const status = "active";
                navigate("/assignment", { state: { result, status } });
              }}
            /> */}

            <NavDropdown
              title={
                user?.data?.image?
                <img
                  src={`data:${mineType(user?.data?.image.imageFormat)};base64,${user?.data?.image}`}
                  alt="profile"
                  className="rounded-circle"
                  style={{ width: "40px", height: "40px" }}
                />:<Icon icon="ion:person-sharp" width="40" height="40"  style={{color: 'white'}} />
              }
              id="profile-dropdown"
              align="end"
            >
              <Button
                className={"btn bg-white mb-1"}
                children="Profile"
                onClick={() => navigate("/profile")}
              /><br/>
              {localStorage.getItem('role')==='ADMIN'&&<Button
                className={"btn bg-white mb-1"}
                children={`${role==='ADMIN'?'USER':'ADMIN'}`}
                onClick={() => setRole(role==='ADMIN'?'USER':'ADMIN')}
              />}
              <NavDropdown.Divider />
              <Button
                className={"btn bg-white mb-1"}
                children="Logout"
                onClick={() => navigate("/")}
              />
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
