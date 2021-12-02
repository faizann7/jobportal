import React, { useState, useEffect } from "react";
import axios from "axios";
import "./cards.scss";
import { Link } from "react-router-dom";

const Cards = () => {
  const [jobs, setJobs] = useState([]);

  const URL = "http://localhost:5000/api/jobs/getjobs";

  useEffect(() => {
    getAllJobs();
  }, []);

  const getAllJobs = () => {
    axios
      .get(`${URL}`)
      .then((response) => {
        setJobs(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(`Error ${error}`);
      });
  };

  const convertDate = (d) => {
    let date = new Date(d);
    var options = { day: "numeric", month: "long" };
    console.log(d.toLocaleDateString("en-UK", options));
    //setPostingdate(d.toLocaleDateString("en-UK", options))
  };

  return (
    <>
      <div className="cards">
        {jobs.map((job) => (
          <div className="data-card">
            <div className="details">
              <span className="l">{job.user.username}</span>
              <span className="r">{job.user.username}</span>
            </div>
            <div className="job-div">
              <h3>{job.title}</h3>
            </div>

            <div className="cat">
              <span> {job.type}</span>
            </div>
            <div className="job-div">
              <h4>{job.location}</h4>
            </div>
            <div className="job-div">
              <p className="c"> {job.description}</p>
            </div>

            <div className="job-div">
              <input className="applybutton" value="Apply" />
              {/* <Link to={`/jobdetails/${job._id}`}>View Job </Link> */}
              <Link to={`/jobdetails/${job._id}`}>View Job </Link>{" "}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Cards;
