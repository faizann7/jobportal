import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./about.scss";
import { ReactComponent as Avatar } from "../avatar.svg";
import { Table, TableBody, TableCell, TableRow } from "@material-ui/core";

const About = () => {
  const [user, setUser] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  let token = localStorage.getItem("token");
  let userId = localStorage.getItem("userId");
  let userType = localStorage.getItem("userType");
  useEffect(() => {
    async function fetchUser() {
      let response = await axios(
        `http://localhost:5000/api/${userType}/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      console.log(response.data.user);
      setUser(response.data.user);
      //   let result = await response.json();
      //   console.log("result",result)
    }
    fetchUser();
  }, []);

  if (userType === "Recruiter") {
    return (
      <>
        <div class="container-about">
          <div class="laft">
            <Avatar className="avatar" />
            <h2>{user.username}</h2>
            <h5>{user.email}</h5>
          </div>
          <div class="raght">
            <h3>Profile Settings</h3>
            <div className="fields">
              <Table>
                <TableRow>
                  <TableCell align="center">
                    <div>Name</div>
                  </TableCell>
                  <TableCell align="center">
                    <input className="aboutinput" placeholder={user.username} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">
                    <div>Email</div>
                  </TableCell>
                  <TableCell align="center">
                    <input className="aboutinput" placeholder={user.email} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">
                    <div>Location</div>
                  </TableCell>
                  <TableCell align="center">
                    <input className="aboutinput" placeholder={user.location} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">
                    <div>Contact Number</div>
                  </TableCell>
                  <TableCell align="center">
                    <input
                      className="aboutinput"
                      placeholder={user.contactNumber}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">
                    <div>Company URL</div>
                  </TableCell>
                  <TableCell align="center">
                    <input
                      className="aboutinput"
                      placeholder={user.companyURL}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">
                    <div>Company Description</div>
                  </TableCell>
                  <TableCell align="center">
                    <input
                      className="aboutinput"
                      placeholder={user.description}
                    />
                  </TableCell>
                </TableRow>
              </Table>
            </div>
            <button to="#" class="save-btn">
              Save Profile
            </button>
          </div>
          <div className="third"></div>
        </div>
      </>
      // <div>
      //   <h3>username: {user.username}</h3>
      //   <h3>Email: {user.email}</h3>
      //   <h3>contactNumber: {user.contactNumber}</h3>
      //   <h3>isRecruiter: {user.isRecruiter}</h3>

      //   <h3>companyURL: {user.companyURL}</h3>
      //   <h3>companyDescription: {user.companyDescription}</h3>
      //   <h3>location: {user.location}</h3>
      //   <button>
      //     <Link to={`/editprofile/${userId}`}>EDIT PROFILE </Link>{" "}
      //   </button>
      // </div>
    );
  } else {
    return (
      <>
        <h3>username: {user.username}</h3>
        <h3>Email: {user.email}</h3>
        <h3>contactNumber: {user.contactNumber}</h3>
        <h3>Skills: {user.skills}</h3>
        <h3>Education: {user.contactNumber}</h3>
      </>
    );
  }
};

export default About;
