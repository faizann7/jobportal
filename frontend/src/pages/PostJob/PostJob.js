import axios from "axios";
import React, { useState } from "react";
import "./postjob.scss";
import { Navigate } from "react-router-dom";

const defaultFormData = {
  deadlineDate: Date.now(),
  duration: 2,
  jobTitle: "MARKETING HEAD",
  jobType: "PART TIME",
  maxApps: 20,
  maxPos: 3,
  numApps: 0,
  requiredSkills: ["REACTJS", "NODE JS"],
  salary: 25000,
};

const PostJob = () => {
  const [job, setJob] = useState(defaultFormData);

  const [title, setTitle] = useState("");
  const [type, setType] = useState("Full Time");
  const [location, setLocation] = useState("Karachi");
  const [experience, setExperience] = useState("");
  const [department, setDepartment] = useState("");
  const [description, setDescription] = useState("");
  const [maxApps, setMaxApps] = useState(0);
  const [maxPos, setMaxPos] = useState(0);
  const [requiredSkills, setRequiredSkills] = useState([]);
  const [salary, setSalary] = useState(0);
  const [deadlineDate, setDeadlineDate] = useState(new Date());

  const [error, setError] = useState();

  const URL = "http://localhost:5000/api/jobs/addjob";
  let token = localStorage.getItem("token");
  let userId = localStorage.getItem("userId");
  //let username = "faizann"
  // let data = {
  //     ...defaultFormData
  //   };
  const submit = async (e) => {
    e.preventDefault();
    //const data = { FormData };
    try {
      const data = {
        deadlineDate,
        location,
        experience,
        department,
        title,
        type,
        maxApps,
        maxPos,
        requiredSkills,
        salary,
        description,
      };
      let response = await axios({
        method: "POST",
        url: "http://localhost:5000/api/jobs/addjob",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        data: data,
      });

      console.log(response);
      if (response.status === 200) {
        alert("Job Posted!!");
      }
    } catch (error) {
      console.log(error.response.data.message); // this is the main part. Use the response property from the error object
      error.response.data.message && setError(error.response.data.message);
      alert(error.response.data.message);
    }
  };
  console.log(type);
  console.log(location);
  let userType = localStorage.getItem("userType");
  if (userType === "Recruiter") {
    return (
      <>
        <div className="container">
          <div className="title">CREATE JOB POSTING</div>
          <div className="content-addjob">
            <form onSubmit={submit}>
              <div className="user-details">
                <div className="input-box">
                  <span>Job Title</span>
                  <input
                    type="text"
                    onChange={({ target }) => setTitle(target.value)}
                  />
                </div>
                <div className="input-box">
                  <span>Job Type</span>
                  <select
                    className="dropdown"
                    value={type}
                    onChange={({ target }) => setType(target.value)}
                  >
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Freelance/Contract">
                      Freelance/Contract
                    </option>
                  </select>
                </div>
                <div className="input-box">
                  <span>Location</span>
                  <select
                    className="dropdown"
                    value={location}
                    onChange={({ target }) => setLocation(target.value)}
                  >
                    <option value="Karachi">Karachi</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>
                <div className="input-box">
                  <span>Experience</span>
                  <input
                    type="text"
                    onChange={({ target }) => setExperience(target.value)}
                  />
                </div>
                <div className="input-box">
                  <span>Department</span>
                  <input
                    type="text"
                    onChange={({ target }) => setDepartment(target.value)}
                  />
                </div>
                <div className="input-box">
                  <span>Deadline Date</span>
                  <input
                    type="date"
                    onChange={({ target }) => setDeadlineDate(target.value)}
                  />
                </div>
                <div className="input-box">
                  <span>Max Appearances</span>
                  <input
                    type="Number"
                    onChange={({ target }) => setMaxApps(target.value)}
                  />
                </div>
                <div className="input-box">
                  <span>Max Positions</span>
                  <input
                    type="Number"
                    onChange={({ target }) => setMaxPos(target.value)}
                  />
                </div>
                <div className="input-box">
                  <span>Salary</span>
                  <input
                    type="Number"
                    onChange={({ target }) => setSalary(target.value)}
                  />
                </div>
                <div className="input-box">
                  <span>Required Skills</span>
                  <input
                    type=""
                    onChange={({ target }) => setRequiredSkills(target.value)}
                  />
                </div>

                <div className="input-box">
                  <span>Job Description</span>
                  <textarea
                    type="textbox"
                    onChange={({ target }) => setDescription(target.value)}
                  />
                </div>
                <div class="button">
                  <input type="submit" value="Create" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  } else {
    return <Navigate to="/login" />;
  }
};

export default PostJob;
