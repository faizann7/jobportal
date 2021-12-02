import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Modal from "../../components/Modal/Modal";
import "./Profile.scss";
const Profile = () => {
  const [user, setUser] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  let token = localStorage.getItem("token");
  let userId = localStorage.getItem("userId");
  useEffect(() => {
    fetchUser();
  }, []);
  async function fetchUser() {
    let response = await axios(
      `http://localhost:5000/api/recruiter/${userId}`,
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
  }

  return (
    <>
      <Navbar />
      <Modal />
      <button
        onClick={(e) => {
          if (window.confirm("Are you sure you wish to delete this item?"))
            this.deleteItem(e);
        }}
      >
        Delete
      </button>
      {/* <div className="container-profile">
        <div className="title-profile">USER PROFILE</div>
        <div className="content-profile">
          <form>
            <div className="profile-details">
              <div className="input-box-profile">
                <span>Job Title</span>
                <input type="text" />
              </div>
              <div class="button-profile">
                <input type="submit" value="Update" />
              </div>
            </div>
          </form>
        </div>
      </div> */}
    </>
  );
};

export default Profile;
