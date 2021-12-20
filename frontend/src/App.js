import React from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Login from "./pages/Login/Login";
import PostJob from "./pages/PostJob/PostJob";
import Regsiter from "./pages/Register/Regsiter";
import UpdateJob from "./pages/UpdateJob/UpdateJob";
import MyJobs from "./pages/MyJobs/MyJobs";
import JobDetails from "./pages/JobDetails/JobDetails";
import Apply from "./pages/Applicant/Apply";
import Applications from "./pages/Recruiter/Applications";
import AcceptedEmployees from "./pages/Recruiter/AcceptedEmployees";
import MyApplications from "./pages/Applicant/MyApplications";
import Naavbar from "./components/Naavbar";
import FindJobs from "./pages/FindJobs";

function App() {
  return (
    <div className="App">
      <Naavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/findjobs" element={<FindJobs />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Regsiter />} />
        <Route path="/postjob" element={<PostJob />} />
        <Route path="/updatejob/:id" element={<UpdateJob />} />
        <Route path="/myjobs" element={<MyJobs />} />
        <Route path="/jobdetails/:id" element={<JobDetails />} />
        <Route path="/applications/:id" element={<Applications />} />
        <Route path="/acceptedemployees" element={<AcceptedEmployees />} />
        <Route path="/apply/:id" element={<Apply />} />
        <Route path="/myapplications/" element={<MyApplications />} />
      </Routes>
    </div>
  );
}

export default App;
