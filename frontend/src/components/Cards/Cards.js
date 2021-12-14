import React, { useState, useEffect } from "react";
import axios from "axios";
import "./cards.scss";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "../Pagination/pagination.scss";
import daraz from "../../images/daraz.png";
import ClipLoader from "react-spinners/ClipLoader";
import { AiOutlineSearch } from "react-icons/ai";
import { GrLocation } from "react-icons/gr";

const Cards = () => {
  const [jobs, setJobs] = useState([]);

  const [changePage, setChangePage] = useState(1);

  useEffect(() => {
    // getAllJobs(changePage);
  }, []);
  const getAllJobs = (changePage) => {
    axios
      .get(
        //`http://localhost:5000/api/jobs/jobs?page=${changePage}&location=${dropdown}`
        `http://localhost:5000/api/jobs/jobs?page=${changePage}`
      )
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
  //console.log(changePage);

  const dropdownFunc = (city) => {
    axios
      .get(
        `http://localhost:5000/api/jobs/jobs?page=${changePage}&location=${city}`
      )
      .then((response) => {
        setJobs(response.data.data);
        //console.log(response.data.data);
      })
      .catch((error) => {
        console.error(`Error ${error}`);
      });
  };

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 1000);
  // }, []);
  const searchFilter = (s) => {
    console.log(search);
    axios
      .get(
        `http://localhost:5000/api/jobs/jobs?page=${changePage}&title=${search}`
      )
      .then((response) => {
        setJobs(response.data.data);
      })
      .catch((error) => {
        console.error(`Error ${error}`);
      });
  };

  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    console.log(value);
    const ff = (v) => {
      axios
        .get(
          `http://localhost:5000/api/jobs/jobs?page=${changePage}&location=${v}`
        )
        .then((response) => {
          setJobs(response.data.data);
        })
        .catch((error) => {
          console.error(`Error ${error}`);
        });
    };
    ff(value);
  }, [value]);

  return (
    <>
      <div className="job-search">
        <div class="box">
          <AiOutlineSearch />
          <input
            type="text"
            placeholder="Search.."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="searchBtn"
            type="button"
            onClick={() => searchFilter()}
          >
            submit
          </button>
        </div>
        <div class="box">
          <GrLocation />
          <select className="dropdown" value={value} onChange={handleChange}>
            <option value="Karachi">Karachi</option>
            <option value="Lahore">Lahore</option>
            <option value="Islamabad">Islamabad</option>
            <option value="">Select Location</option>
          </select>
        </div>
        <div class="box">
          <AiOutlineSearch />
          <input type="text" placeholder="UNDER CONSTRUCTION.." />
        </div>
      </div>
      {loading ? (
        <div className="loader">
          <ClipLoader color={"#1a75e8"} loading={loading} size={130} />
        </div>
      ) : (
        <div className="cards">
          {jobs.map((job) => (
            <div className="data-card">
              <div className="details">
                <span className="l">
                  <img src={daraz} alt={daraz} />
                </span>
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
      )}
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
