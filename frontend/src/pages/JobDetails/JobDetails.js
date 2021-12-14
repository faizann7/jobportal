import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Jobdetails.scss";
import { Link } from "react-router-dom";
import { useParams } from "react-router";

import { ReactComponent as Avatar } from "../../avatar.svg";
import { BiArrowBack } from "react-icons/bi";

const JobDetails = () => {
  const [job, setJob] = useState([]);
  const [postingDate, setPostingDate] = useState("");

  let { id } = useParams();

  const URL = `http://localhost:5000/api/jobs/${id}`;

  useEffect(() => {
    function getJob() {
      axios
        .get(`${URL}`)
        .then((response) => {
          setJob(response.data.job);
          //console.log(response.data.job);
          let a = response.data.job.postingDate;
          let d = new Date(a);
          var options = { day: "numeric", month: "long" };
          console.log(d.toLocaleDateString("en-UK", options));
          setPostingDate(d.toLocaleDateString("en-UK", options));
        })
        .catch((error) => {
          console.error(`Error ${error}`);
        });
      //console.log(job.duration);
    }
    getJob();
  }, []);

  return (
    <>
      <div className="job-container">
        <div className="hamburger">
          <Link className="goback" to="/findjobs">
            <span className="gobackicon">
              <BiArrowBack />
            </span>
            All Jobs
          </Link>
        </div>
        <div className="job-details">
          <h1>{job.title}</h1>
          <p>{job.description}</p>
          <div className="applybuttondiv">
            <Link className="applybutton" to={`/apply/${job._id}`}>
              Apply for this Position
            </Link>
          </div>
        </div>
        <div className="job-details-sidebar">
          <Avatar />

          <h2>Careem</h2>

          <p className="website">Visit Website</p>
          <div className="border-line"></div>
          <div className="job-types">
            <p>Job Type</p>
            <h5>{job.type}</h5>
            <p>Location</p>
            <h5>{job.location}</h5>
            <p>Date Posted</p>
            <h5>{postingDate}</h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetails;
