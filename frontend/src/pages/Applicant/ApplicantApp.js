import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Button,
} from "@material-ui/core";

const MyApplications = () => {
  const [data, setData] = useState([]);

  let userId = localStorage.getItem("userId");
  const URL = `http://localhost:5000/api/application/byapplicant/${userId}`;
  useEffect(() => {
    async function getJob() {
      axios
        .get(`${URL}`)
        .then((res) => {
          setData(res.data.applications);
          console.log(res.data.applications);
        })
        .catch((error) => {
          console.error(`Error ${error}`);
        });
    }
    getDetails();
    getJob();
  }, []);

  const [details, setDetails] = useState([]);
  const getDetails = () => {
    axios({
      method: "GET",
      url: `http://localhost:5000/api/application/applicantapps/61a50be0f86ab3cd01fd5a8c`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    })
      .then((response) => {
        setDetails(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="container">
        <div className="title">Accepted Employees</div>
        <div className="content-addjob">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <div>Job Title</div>
                </TableCell>
                <TableCell align="center">
                  <div>Job Type</div>
                </TableCell>
                <TableCell align="center">
                  <div>Company</div>
                </TableCell>
                <TableCell align="center">
                  <div>Status</div>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((job) => (
                <TableRow>
                  <TableCell align="center">
                    <div>{job._id}</div>
                  </TableCell>
                  <TableCell align="center">
                    <div>{job.jobtitle}</div>
                  </TableCell>
                  <TableCell align="center">
                    <div>{job.jobtype}</div>
                  </TableCell>
                  <TableCell align="center">
                    <div>{job.status}</div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default MyApplications;
