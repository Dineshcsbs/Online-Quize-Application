import React, { useState } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Icon } from "@iconify/react"; 
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/logo.jpg";
import {
  useAvailablePracticeQuery,
  usePendingTestQuery,
  useUserDataQuery,
} from "../service/LoginService";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const CustomNavbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { data: availablePracticeTest } = useAvailablePracticeQuery();
  const { data: pendingTest } = usePendingTestQuery();
  const { data: user } = useUserDataQuery();

  localStorage.setItem("name", user?.name);
  const navigate = useNavigate();
  const handleNavbarToggle = () => {
    setNavbarOpen(!navbarOpen);
  };

  return (
    <Navbar expand="lg" bg="dark" className="py-2">
      <Container fluid>
        <Navbar.Brand href="#" className="fw-bold bg-dark text-white">
          <img
            src={logo}
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
                const result = pendingTest;
                const status = "active";
                navigate("/assignment", { state: { result, status } });
              }}
            />

            <NavDropdown
              title={
                <img
                  src={`data:${"image/jpeg"};base64,${user?.image}`}
                  alt="profile"
                  className="rounded-circle"
                  style={{ width: "40px", height: "40px" }}
                />
              }
              id="profile-dropdown"
              align="end"
            >
              <Button
                className={"btn bg-white mb-1"}
                children="Profile"
                onClick={() => navigate("/profile")}
              />
              <NavDropdown.Divider />
              <NavDropdown.Item href="#">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
