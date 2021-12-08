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
import "./applicationstyle.scss";
import { Navigate, useNavigate, useParams } from "react-router";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  let userId = localStorage.getItem("userId");
  const { id } = useParams();
  const URL = `http://localhost:5000/api/application/viewapplications/${id}`;
  useEffect(() => {
    async function getJob() {
      axios
        .get(`${URL}`)
        .then((response) => {
          setApplications(response.data.applications);
          console.log(response.data);
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
          style={{ backgroundColor: "#00FF00", color: "#fff" }}
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
          style={{ backgroundColor: "#333", color: "#fff" }}
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
    } else
      return (
        <div style={{ fontWeight: "bold", color: "#f44336" }}>Rejected</div>
      );
  };

  return (
    <>
      <div className="container">
        <div className="title">My Jobs</div>
        <div className="content-addjob">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Applicant Name</TableCell>
                <TableCell align="center">Applicant Email</TableCell>
                <TableCell align="center">Application Status</TableCell>
                <TableCell align="center">Cover Letter</TableCell>
                <TableCell align="center">Date of Application</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applications.map((job) => (
                <TableRow>
                  <TableCell align="center">{job.user.username}</TableCell>
                  <TableCell align="center">{job.user.email}</TableCell>
                  <TableCell align="center">
                    {appStatusColor(job.status)}
                  </TableCell>
                  <TableCell align="center">{job.coverLetter}</TableCell>
                  <TableCell align="center">{job.appDate}</TableCell>
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
};

export default Applications;
