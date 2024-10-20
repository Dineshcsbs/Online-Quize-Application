import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import { Route, Routes, BrowserRouter, Outlet } from "react-router-dom";
import Profile from "./pages/Profile";
import DashBoard from "./pages/DashBoard";
import Assignment from "./pages/Assignment";
import Practice from "./pages/Practice";
import TestWindow from "./pages/TestWindow";
import CountdownTimer from "./pages/Hooks";
import Result from "./pages/Result";
import CommonTest from "./components/CommonTest";
import SignUp from "./pages/SignUp";
import AnswerView from "./pages/AnswerView";
import RegisterTest from "./pages/RegisterTest";
import CompletedTest from "./pages/CompletedTest";


function App() {

  // const Layout = () => {
  //   return (
  //     <Stack height={"100vh"} color={"black"}>
  //       <NavBar />
  //       <Stack flexGrow={1} p={2} overflow={"auto"}>
  //         <Outlet />
  //       </Stack>
  //     </Stack>
  //     <></>
  //   );
  // };


  return (


    <BrowserRouter>
      <Routes>
      <Route path="/t" element={<CountdownTimer/>}/>
        <Route path="/" element={<Login />} />
        <Route path="/admin-sign-up" element={<SignUp authority={true}/>} />
        <Route path="/sign-up" element={<SignUp authority={false}/>} />
        <Route path="/profile" element={<><NavBar /><Profile /></>} />
        <Route path="/dashboard" element={<><NavBar /><DashBoard/></>}/>
        <Route path="/assignment" element={<><NavBar /><Assignment/></>}/>
        <Route path="/completed" element={<><NavBar /><CompletedTest/></>}/>
        <Route path="/practice" element={<><NavBar /><Practice/></>}/>
        <Route path="/common" element={<><NavBar/><CommonTest/></>}/>
        <Route path="/test" element={<TestWindow/>}/>
        <Route path="/result" element={<Result/>}/>
        <Route path="/answer" element={<><NavBar /><AnswerView/></>}/>
        <Route path="/register" element={<><NavBar /><RegisterTest/></>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
