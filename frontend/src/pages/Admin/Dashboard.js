import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
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
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  let userType = localStorage.getItem("userType");
  if (userType === "Admin") {
    return (
      <>
        <div>
          <div className="container">
            <div className="title">My Jobs</div>
            <div className="content-addjob">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <div>Company Name</div>
                    </TableCell>
                    <TableCell align="center">
                      <div>Title</div>
                    </TableCell>
                    <TableCell align="center">
                      <div>Type</div>
                    </TableCell>
                    <TableCell align="center">
                      <div>Number of Applicants</div>
                    </TableCell>

                    <TableCell align="center">Accepted Applicants</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {jobs.map((job) => (
                    <TableRow>
                      <TableCell align="center">
                        <div>{job.user.username}</div>
                      </TableCell>
                      <TableCell align="center">
                        <div>{job.title}</div>
                      </TableCell>
                      <TableCell align="center">
                        <div>{job.type}</div>
                      </TableCell>
                      <TableCell align="center">
                        <div>{job.numApps}</div>
                      </TableCell>
                      <TableCell align="center">
                        <div>{job.numAccepted}</div>
                      </TableCell>

                      <TableCell align="center">
                        <Button
                          // onClick={() => deleteJob(job._id)}
                          onClick={handleClickOpen}
                          style={{ backgroundColor: "#f44336", color: "#fff" }}
                        >
                          REMOVE
                        </Button>
                        <Dialog
                          fullScreen={fullScreen}
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="responsive-dialog-title"
                        >
                          <DialogTitle id="responsive-dialog-title">
                            {"Are you sure you want to delete?"}
                          </DialogTitle>

                          <DialogActions>
                            <Button autoFocus onClick={handleClose}>
                              NO
                            </Button>
                            <Button
                              onClick={() => deleteJob(job._id)}
                              autoFocus
                            >
                              YES
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {/* <Dialog show={dialog} /> */}
            </div>
          </div>

          {/* <EditableJobs myjobs={myjobs}/> */}
        </div>
      </>
    );
  } else {
    return <Navigate to="/login" />;
  }
};

export default Dashboard;
