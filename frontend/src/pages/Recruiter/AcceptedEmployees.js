import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Button,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core";
import "./applicationstyle.scss";
import { Navigate } from "react-router-dom";
const AcceptedEmployees = () => {
  const [data, setData] = useState([]);

  let userId = localStorage.getItem("userId");
  const URL = `http://localhost:5000/api/application/byrecruiter/${userId}`;
  useEffect(() => {
    async function getJob() {
      axios
        .get(`${URL}`)
        .then((res) => {
          setData(res.data.applicants);
          console.log(res.data.applicants);
          console.log(res.data);
        })
        .catch((error) => {
          console.error(`Error ${error}`);
        });
    }
    getJob();
  }, []);
  const theme = createMuiTheme({
    overrides: {
      // Style sheet name ⚛️
      MuiTableCell: {
        // Name of the rule
        text: {
          // Some CSS
          color: "red",
        },
      },
    },
  });
  let userType = localStorage.getItem("userType");
  if (userType === "Recruiter") {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="container">
          <div className="title">Accepted Employees</div>
          <div className="content-addjob">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    <div>Applicant Name</div>
                  </TableCell>
                  <TableCell align="center">
                    <div>Job Title</div>
                  </TableCell>
                  <TableCell align="center">
                    <div>Job Type</div>
                  </TableCell>
                  <TableCell align="center">
                    <div>Joining Date</div>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((job) => (
                  <TableRow>
                    <TableCell align="center">
                      <div>{job.name}</div>
                    </TableCell>
                    <TableCell align="center">
                      <div>{job.jobtitle}</div>
                    </TableCell>
                    <TableCell align="center">
                      <div>{job.jobtype}</div>
                    </TableCell>
                    <TableCell align="center">
                      <div>{job.joiningDate}</div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </MuiThemeProvider>
    );
  } else {
    return <Navigate to="/login" />;
  }
};

export default AcceptedEmployees;
