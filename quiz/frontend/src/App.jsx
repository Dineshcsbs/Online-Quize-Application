import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes, BrowserRouter, Outlet } from "react-router-dom";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp"
import Layout from "./pages/Layout"
import DashBoard from "./pages/dashboard/DashBoard"
import Assignment from "./pages/display-package/Assignment";
import CompletedTest from "./pages/display-package/CompletedTest";
import Practice from "./pages/display-package/Practice";
import RegisterAssignment from "./pages/register-package/RegisterAssignment";
import RegisterPractice from "./pages/register-package/RegisterPractice";
import CommonTest from "./components/CommonTest";
import Profile from "./pages/profile/Profile";
import TestWindow from "./pages/test/TestWindow";
import AnswerView from "./pages/answer/AnswerView";
import Result from "./pages/result/Result";
import RegisterTest from "./pages/register-package/RegisterTest";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin-sign-up" element={<SignUp authority={true} />} />
        <Route path="/sign-up" element={<SignUp authority={false} />} />

        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/assignment" element={<Assignment/>}/>
          <Route path="/completed" element={<CompletedTest/>}/>
          <Route path="/practice" element={<Practice/>}/>
          <Route path="/register-assignment" element={<RegisterAssignment/>}/>
          <Route path="/register-test" element={<RegisterPractice/>}/>
          <Route path="/common" element={<CommonTest/>}/>
          <Route path="/register" element={<RegisterTest/>}/>
        </Route>
        <Route path="/test" element={<TestWindow/>}/>
        <Route path="/result" element={<Result/>}/>
        <Route path="/answer" element={<AnswerView/>}/>
      </Routes>
    </BrowserRouter>

    // <BrowserRouter>
    //   <Routes>
    //   <Route path="/nroll-test" element={<Scorrling/>}/>
    //     <Route path="/" element={<Login />} />
    //     <Route path="/admin-sign-up" element={<SignUp authority={true}/>} />
    //     <Route path="/sign-up" element={<SignUp authority={false}/>} />
    //     <Route path="/profile" element={<Profile />} />
    //     <Route path="/dashboard" element={<DashBoard/>}/>
    //     <Route path="/assignment" element={<Assignment/>}/>
    //     <Route path="/completed" element={<CompletedTest/>}/>
    //     <Route path="/practice" element={<Practice/>}/>
    //     <Route path="/register-assignment" element={<RegisterAssignment/>}/>
    //     <Route path="/register-test" element={<RegisterPractice/>}/>
    //     <Route path="/common" element={<CommonTest/>}/>
    //     <Route path="/test" element={<TestWindow/>}/>
    //     <Route path="/result" element={<Result/>}/>
    //     <Route path="/answer" element={<AnswerView/>}/>
    //     <Route path="/register" element={<RegisterTest/>}/>
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;
