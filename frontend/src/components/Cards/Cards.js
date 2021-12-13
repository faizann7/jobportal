import React, { useState, useEffect } from "react";
import axios from "axios";
import "./cards.scss";
import { Link } from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import ReactPaginate from "react-paginate";
import "../Pagination/pagination.scss";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { ReactComponent as Careem } from "../../images/careem.svg";
import daraz from "../../images/daraz.png";

const Cards = () => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);

  const [changePage, setChangePage] = useState(1);
  const [location, setLocation] = useState("");

  //const URL = "http://localhost:5000/api/jobs/getjobs";
  //const URL = "http://localhost:5000/api/jobs/jobs?page=3";

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

  const convertDate = (d) => {
    let date = new Date(d);
    var options = { day: "numeric", month: "long" };
    console.log(d.toLocaleDateString("en-UK", options));
    //setPostingdate(d.toLocaleDateString("en-UK", options))
  };

  const dropdownFunc = (city) => {
    axios
      .get(
        `http://localhost:5000/api/jobs/jobs?page=${changePage}&location=${city}`
        // `http://localhost:5000/api/jobs/jobs?page=${changePage}`
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
  const searchFilter = (s) => {
    console.log(search);
    axios
      .get(
        `http://localhost:5000/api/jobs/jobs?page=${changePage}&title=${search}`
        // `http://localhost:5000/api/jobs/jobs?page=${changePage}`
      )
      .then((response) => {
        setJobs(response.data.data);
        //console.log(response.data.data);
      })
      .catch((error) => {
        console.error(`Error ${error}`);
      });
  };

  //const [dropdown, setDropdown] = useState("Lahore");

  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    console.log(value);
    const ff = (v) => {
      axios
        .get(
          `http://localhost:5000/api/jobs/jobs?page=${changePage}&location=${v}`
          // `http://localhost:5000/api/jobs/jobs?page=${changePage}`
        )
        .then((response) => {
          setJobs(response.data.data);
          //console.log(response.data.data);
        })
        .catch((error) => {
          console.error(`Error ${error}`);
        });
    };
    ff(value);
  }, [value]);

  return (
    <>
      <div>
        <h3>SHOWING JOBS FOR LOCATION: </h3>
        {/* <select>
            <option onClick={dropdownFunc("Karachi")} value="Karachi">
              Karachi
            </option>
            <option onClick={dropdownFunc("Lahore")} value="Lahore">Lahore</option>
            <option onClick={dropdownFunc("Islamabad")} value="Islamabad">Islamabad</option>
          </select> */}
        <button onClick={() => dropdownFunc("Karachi")}>karachi</button>
        <button onClick={() => dropdownFunc("Lahore")}>lahore</button>
        <button onClick={() => dropdownFunc("Islamabad")}>islamabad</button>
      </div>
      <span>Search:</span>
      <input
        type="text"
        placeholder="SEARCH.."
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="button" onClick={() => searchFilter()}>
        submit
      </button>
      <select value={value} onChange={handleChange}>
        <option value="Karachi">Karachi</option>
        <option value="Lahore">Lahore</option>
        <option value="Islamabad">Islamabad</option>
        <option value="">REMOVE FILTER</option>
      </select>
      <p>{`You selected ${value}`}</p>
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
