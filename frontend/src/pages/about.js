import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
      <div>
        <h3>username: {user.username}</h3>
        <h3>Email: {user.email}</h3>
        <h3>contactNumber: {user.contactNumber}</h3>
        <h3>isRecruiter: {user.isRecruiter}</h3>

        <h3>companyURL: {user.companyURL}</h3>
        <h3>companyDescription: {user.companyDescription}</h3>
        <h3>location: {user.location}</h3>
        <button>
          <Link to={`/editprofile/${userId}`}>EDIT PROFILE </Link>{" "}
        </button>
      </div>
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
