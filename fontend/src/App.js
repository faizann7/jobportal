import React from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Services from "./pages/services";
import Contact from "./pages/contact";
import SignUp from "./pages/signup";
import Login from "./pages/Login/Login";
import PostJob from "./pages/PostJob/PostJob";
import Regsiter from "./pages/Register/Regsiter";
import UpdateJob from "./pages/UpdateJob/UpdateJob";
import MyJobs from "./pages/MyJobs/MyJobs";
import JobDetails from "./pages/JobDetails/JobDetails";
import Profile from "./pages/Profile/Profile";
import Apply from "./pages/Applicant/Apply";
import Applications from "./pages/Recruiter/Applications";
import CheckApp from "./pages/Recruiter/CheckApp";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Regsiter />} />
        <Route path="/postjob" element={<PostJob />} />
        <Route path="/updatejob/:id" element={<UpdateJob />} />
        <Route path="/myjobs" element={<MyJobs />} />
        <Route path="/jobdetails/:id" element={<JobDetails />} />
        <Route path="/applications/:id" element={<Applications />} />
        <Route path="/check" element={<CheckApp />} />

        <Route path="/apply/:id" element={<Apply />} />
      </Routes>
    </div>
  );
}

export default App;
