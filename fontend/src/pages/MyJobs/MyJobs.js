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

import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Modal from "../../components/Modal/Modal";
const MyJobs = () => {
  let userId = localStorage.getItem("userId");

  const [myjobs, setMyjobs] = useState([]);
  const [postingdate, setpostingdate] = useState("");
  const [deadline, setDeadline] = useState("");

  const navigate = useNavigate();

  const URL = `http://localhost:5000/api/jobs/byrecruiter/${userId}`;
  useEffect(() => {
    async function getJob() {
      axios
        .get(`${URL}`)
        .then((response) => {
          setMyjobs(response.data.myjobs);
          console.log(response.data.myjobs);
        })
        .catch((error) => {
          console.error(`Error ${error}`);
        });
    }
    getJob();
  }, []);

  let token = localStorage.getItem("token");
  const deleteJob = (id) => {
    const DELETE_URL = `http://localhost:5000/api/jobs/deletejob/${id}`;
    axios({
      method: "DELETE",
      url: DELETE_URL,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        console.log("JOB DELETED");
        navigate(0); //reload
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="title">My Jobs</div>
        <div className="content-addjob">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Title</TableCell>
                <TableCell align="center">Type</TableCell>
                <TableCell align="center">Date Of Posting</TableCell>
                <TableCell align="center">Number of Applicants</TableCell>
                <TableCell align="center">Total Number of Positions</TableCell>
                <TableCell align="center">Accepted Applicants</TableCell>
                <TableCell align="center">Deadline</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {myjobs.map((job) => (
                <TableRow>
                  <TableCell align="center">{job.title}</TableCell>
                  <TableCell align="center">{job.type}</TableCell>
                  <TableCell align="center">{postingdate}</TableCell>
                  <TableCell align="center">{job.numApps}</TableCell>
                  <TableCell align="center">{job.maxPos}</TableCell>
                  <TableCell align="center">{job.numAccepted}</TableCell>
                  <TableCell align="center">{job.deadlineDate}</TableCell>
                  <TableCell align="center">
                    <Button
                      style={{ backgroundColor: "#6495ED", color: "#fff" }}
                      component={Link}
                      to={`/updatejob/${job._id}`}
                    >
                      Edit Job
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      style={{ backgroundColor: "#2D85C4", color: "#fff" }}
                      component={Link}
                      to={`/applications/${job._id}`}
                    >
                      View Applications
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      onClick={() => deleteJob(job._id)}
                      style={{ backgroundColor: "#f44336", color: "#fff" }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* <EditableJobs myjobs={myjobs}/> */}
    </div>
  );
};

export default MyJobs;
