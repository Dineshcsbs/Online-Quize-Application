import React from "react";
import CustomNavbar from "../components/NavBar";
import { Outlet } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <CustomNavbar />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
