import axios from "axios";
import { Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Button,
} from "@material-ui/core";
import "./applicationstyle.scss";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import Base64Downloader from "react-base64-downloader";
const Applications = () => {
  const [applications, setApplications] = useState([]);
  let userId = localStorage.getItem("userId");
  const { id } = useParams();
  const URL = `http://localhost:5000/api/application/viewapplications/${id}`;

  const [base, setBase] = useState("");
  useEffect(() => {
    async function getJob() {
      axios
        .get(`${URL}`)
        .then((response) => {
          setApplications(response.data.applications);
          console.log(response.data);
          //console.log(response.data.applications[0].resume);
          var obj = JSON.stringify(response.data.applications[0].resume);
        })
        .catch((error) => {
          console.error(`Error ${error}`);
        });
    }
    getJob();
  }, []);

  let navigate = useNavigate();
  let token = localStorage.getItem("token");

  const ar = (a) => {
    const data = { status: "Applied" };
    axios({
      method: "PUT",
      url: `http://localhost:5000/api/application/${a}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      data: data,
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          alert("Applicant Successfully Shortlisted For This Job.");
          navigate(0);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // return (
  //   <>
  //     {applications.map((job) => {
  //       if (job.status === "Applied") {
  //         return <Button>Shortlist</Button>;
  //       } else {
  //         return;
  //         <Button>Shortlisted</Button>;
  //       }
  //     })}
  //   </>
  // );

  const shortlist = (applicationId) => {
    const data = { status: "Shortlisted" };
    axios({
      method: "PUT",
      url: `http://localhost:5000/api/application/${applicationId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      data: data,
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          alert("Applicant Successfully Shortlisted For This Job.");
          navigate(0);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const reject = (applicationId) => {
    const data = { status: "Rejected" };
    axios({
      method: "PUT",
      url: `http://localhost:5000/api/application/${applicationId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      data: data,
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          alert("Applicant Successfully Rejected For This Job.");
          navigate(0);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const accept = (applicationId) => {
    const data = { status: "Accepted" };
    axios({
      method: "PUT",
      url: `http://localhost:5000/api/application/${applicationId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      data: data,
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          alert("Applicant Successfully Accepted For This Job.");
          navigate(0);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getBackgroundColor = (status, i) => {
    if (status === "Applied") {
      return (
        <Button
          style={{ backgroundColor: "#6495ED", color: "#fff" }}
          onClick={() => shortlist(i)}
        >
          Shortlist
        </Button>
      );
    } else if (status === "Shortlisted") {
      return (
        <Button
          style={{ backgroundColor: "#f1bc31", color: "#fff" }}
          onClick={() => accept(i)}
        >
          Accept
        </Button>
      );
    } else return <div></div>;
  };

  const rejectButton = (status, i) => {
    if (status === "Rejected" || status === "Accepted") {
      return <div></div>;
    } else
      return (
        <Button
          style={{ backgroundColor: "#f0134d", color: "#fff" }}
          onClick={() => reject(i)}
        >
          {" "}
          Reject{" "}
        </Button>
      );
  };

  const appStatusColor = (status) => {
    if (status === "Accepted") {
      return (
        <div style={{ fontWeight: "bold", color: "#00FF00" }}>Accepted</div>
      );
    } else if (status === "Shortlisted") {
      return (
        <div style={{ fontWeight: "bold", color: "#6495ED" }}>Shortlisted</div>
      );
    } else if (status === "Applied") {
      return (
        <div style={{ fontWeight: "bold", color: "#6495ED" }}>Applied</div>
      );
    } else
      return (
        <div style={{ fontWeight: "bold", color: "#f44336" }}>Rejected</div>
      );
  };

  let userType = localStorage.getItem("userType");

  if (userType === "Recruiter") {
    return (
      <>
        <div className="container">
          <div className="title">My Jobs</div>
          <div className="content-addjob">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    <div>Applicant Name</div>
                  </TableCell>
                  <TableCell align="center">
                    <div>Applicant Email</div>
                  </TableCell>
                  <TableCell align="center">
                    <div>Application Status</div>
                  </TableCell>
                  <TableCell align="center">
                    <div>Cover Letter</div>
                  </TableCell>
                  <TableCell align="center">
                    <div>RESUME</div>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {applications.map((job) => (
                  <TableRow>
                    <TableCell align="center">
                      <div>{job.user.username}</div>
                    </TableCell>
                    <TableCell align="center">
                      <div>{job.user.email}</div>
                    </TableCell>
                    <TableCell align="center">
                      <div>{appStatusColor(job.status)}</div>
                    </TableCell>
                    <TableCell align="center">
                      <div>{job.coverLetter}</div>
                    </TableCell>
                    <TableCell align="center">
                      <div>
                        <a href={job.resume} download={job.user.username}>
                          Download
                        </a>
                      </div>
                    </TableCell>

                    <TableCell align="center">
                      {/* <Button
                      style={{ backgroundColor: "#008CBA", color: "#fff" }}
                      onClick={() => ar(job._id)}
                    >
                      ShortList
                    </Button> */}
                      {getBackgroundColor(job.status, job._id)}
                    </TableCell>
                    <TableCell align="center">
                      {/* <Button
                      style={{ backgroundColor: "#f44336", color: "#fff" }}
                      onClick={() => reject(job._id)}
                    >
                      Reject
                    </Button> */}
                      {rejectButton(job.status, job._id)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </>
    );
  } else {
    return <Navigate to="/login" />;
  }
};

export default Applications;
