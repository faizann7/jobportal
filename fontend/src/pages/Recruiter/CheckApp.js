import axios from "axios";
import React, { useState, useEffect } from "react";

import Navbar from "../../components/Navbar/Navbar";
import { Navigate, useNavigate, useParams } from "react-router";
import { Button } from "@material-ui/core";
const Applications = () => {
  const [applications, setApplications] = useState([]);
  let userId = localStorage.getItem("userId");
  const { id } = useParams();
  const URL = `http://localhost:5000/api/application/viewapplications/61a67a42e237a0bfca5fff40`;
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

  const shortlist = (a) => {
    const data = { status: "Shortlisted" };
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

  const reject = (a) => {
    const data = { status: "Rejected" };
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
          alert("Applicant Successfully Rejected For This Job.");
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
        <Button onClick={() => shortlist(i)}>CLICK TO SHORTLIST USER</Button>
      );
    } else if (status === "Shortlisted") {
      return <Button onClick={() => reject(i)}>CLICK TO REJECT USER</Button>;
    } else return <Button>Rejected</Button>;
  };

  return (
    <>
      {applications.map(
        (job) => getBackgroundColor(job.status, job._id)
        // <div style={{ backgroundColor: getBackgroundColor(job.status) }}>
        //   Button
        // </div>
      )}
    </>
  );
  //   return (
  //     <div style={{ backgroundColor: getBackgroundColor(status) }}>Button</div>
  //   );
};

export default Applications;
