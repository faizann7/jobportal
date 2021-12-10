import React, { useState, useEffect } from "react";
import axios from "axios";
import "./cards.scss";
import { Link } from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import ReactPaginate from "react-paginate";
import "../Pagination/pagination.scss";
const Cards = () => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);

  const [changePage, setChangePage] = useState(1);

  //const URL = "http://localhost:5000/api/jobs/getjobs";
  //const URL = "http://localhost:5000/api/jobs/jobs?page=3";

  useEffect(() => {
    getAllJobs(changePage);
  }, []);
  const getAllJobs = (changePage) => {
    axios
      .get(`http://localhost:5000/api/jobs/jobs?page=${changePage}`)
      .then((response) => {
        setJobs(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error(`Error ${error}`);
      });
  };
  const handlePageClick = (data) => {
    let c = data.selected + 1;

    getAllJobs(c);
    //console.log(data.selected);
  };
  console.log(changePage);

  // const getAllJobs = (changePage) => {
  //   axios
  //     .get(`http://localhost:5000/api/jobs/jobs?page=${changePage}`)
  //     .then((response) => {
  //       setJobs(response.data.data);
  //       console.log(response.data.data);
  //     })
  //     .catch((error) => {
  //       console.error(`Error ${error}`);
  //     });
  // };

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

            <div className="job-div-1">
              {/* <input className="cardbtn-1" value="Apply" /> */}
              <Link className="cardbtn-1" to="#">
                Apply
              </Link>
              {/* <Link to={`/jobdetails/${job._id}`}>View Job </Link> */}
              <Link className="cardbtn-2" to={`/jobdetails/${job._id}`}>
                View Job{" "}
              </Link>{" "}
            </div>
          </div>
        ))}
      </div>
      <div className="divpage">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={10}
          onPageChange={handlePageClick}
          //class names
          containerClassName={"paginateBtn"}
          previousLinkClassName="previousBtn"
          nextLinkClassName="nextBtn"
          activeClassName="paginationActive"
        />
      </div>
    </>
  );
};

export default Cards;
