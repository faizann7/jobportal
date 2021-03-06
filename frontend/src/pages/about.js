import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./about.scss";
import { ReactComponent as Avatar } from "../avatar.svg";
import { Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import Naavbar from "../components/Naavbar";
import { Navigate } from "react-router-dom";
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
  const [skills, setSkills] = useState([]);
  const [education, setEducation] = useState([]);

  const update = (e) => {
    e.preventDefault();
    const UPDATE_URL = `http://localhost:5000/api/${userType}/updateprofile/${userId}`;
    const data = {};
    if (name) data.name = name;
    if (email) data.email = email;
    if (location) data.location = location;
    if (contactNumber) data.contactNumber = contactNumber;
    if (companyURL) data.companyURL = companyURL;
    if (skills) data.skills = skills;
    if (education) data.education = education;

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
  } else if (userType === "applicant") {
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
                    <div>Skills</div>
                  </TableCell>
                  <TableCell align="center">
                    <input
                      className="aboutinput"
                      placeholder={user.skills}
                      onChange={({ target }) => setSkills(target.value)}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">
                    <div>Education</div>
                  </TableCell>
                  <TableCell align="center">
                    <textarea
                      className="abouttext"
                      placeholder={user.education}
                    />
                  </TableCell>
                </TableRow>
              </Table>
              <button class="save-btn">Save Profile</button>
            </form>
          </div>
          <div className="third">
            <div class="container__sections">
              <div class="container__content">
                <div class="container__data">
                  <div>
                    <h3 class="qcontainer__title">BS Computer Science </h3>
                    <span class="container__subtitle">
                      {" "}
                      Institute of Business Administration, Karachi{" "}
                    </span>

                    <div class="container__calender">
                      <i></i>
                      2018 - 2022
                    </div>
                  </div>
                  <div>
                    <span class="container__rounder"></span>
                    <span class="container__line"></span>
                  </div>
                </div>

                <div class="container__data">
                  <div></div>
                  <div>
                    <span class="container__rounder"></span>
                    <span class="container__line"></span>
                  </div>
                  <div>
                    <h3 class="qcontainer__title">FoodPanda</h3>
                    <span class="container__subtitle"> Karachi, Pakistan</span>

                    <div class="container__calender">
                      <i></i>
                      2021 Aug - Sep
                    </div>
                  </div>
                </div>

                <div class="container__data">
                  <div>
                    <h3 class="qcontainer__title">A Levels</h3>
                    <span class="container__subtitle"> Cedar </span>

                    <div class="container__calender">
                      <i></i>
                      2016 - 2017
                    </div>
                  </div>
                  <div>
                    <span class="container__rounder"></span>
                    <span class="container__line"></span>
                  </div>
                </div>
                <div class="container__data">
                  <div></div>
                  <div>
                    <span class="container__rounder"></span>
                  </div>
                  <div>
                    <h3 class="qcontainer__title">O Levels</h3>
                    <span class="container__subtitle"> Cedar </span>

                    <div class="container__calender">
                      <i></i>
                      2009 - 2014
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <Navigate to="/login" />;
  }
};

export default About;
