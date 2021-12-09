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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [location, setLocation] = useState("");
  const [companyURL, setCompanyURL] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");

  const update = (e) => {
    e.preventDefault();
    const UPDATE_URL = `http://localhost:5000/api/recruiter/updateprofile/${userId}`;
    const data = {};
    if (name) data.name = name;
    if (email) data.email = email;
    if (location) data.location = location;
    if (contactNumber) data.contactNumber = contactNumber;
    if (companyURL) data.companyURL = companyURL;

    axios({
      method: "PUT",
      url: UPDATE_URL,
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
          alert("Profile Successfully Updated!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
            <form onSubmit={update} className="fields">
              <Table>
                <TableRow>
                  <TableCell align="center">
                    <div>Name</div>
                  </TableCell>
                  <TableCell align="center">
                    <input
                      className="aboutinput"
                      placeholder={user.username}
                      onChange={({ target }) => setName(target.value)}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">
                    <div>Email</div>
                  </TableCell>
                  <TableCell align="center">
                    <input
                      className="aboutinput"
                      placeholder={user.email}
                      onChange={({ target }) => setEmail(target.value)}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">
                    <div>Location</div>
                  </TableCell>
                  <TableCell align="center">
                    <input
                      className="aboutinput"
                      placeholder={user.location}
                      onChange={({ target }) => setLocation(target.value)}
                    />
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
                      onChange={({ target }) => setContactNumber(target.value)}
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
                      onChange={({ target }) => setCompanyURL(target.value)}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">
                    <div>Company Description</div>
                  </TableCell>
                  <TableCell align="center">
                    <textarea
                      className="abouttext"
                      placeholder={user.companyDescription}
                      onChange={({ target }) =>
                        setCompanyDescription(target.value)
                      }
                    />
                  </TableCell>
                </TableRow>
              </Table>
              <button class="save-btn">Save Profile</button>
            </form>
          </div>
          <div className="third"></div>
        </div>
      </>
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
