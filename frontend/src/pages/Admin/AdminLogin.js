import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import "../Login/Login.scss";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("applicant");

  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState([]);

  const submit = async (e) => {
    e.preventDefault();
    const API_URL = `http://localhost:5000/admin/login`;
    const user = { email, password };
    try {
      let response = await axios({
        method: "post",
        url: API_URL,
        data: user,
      });
      console.log(response.data);
      setUserDetails(response.data);
      if (response.status === 200) {
        console.log("USER LOGGED IN");
        localStorage.setItem("userId", response.data.user._id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userType", response.data.userType);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/admindashboard");
      }
    } catch (error) {
      console.log(error.response);
      alert(error.response.data.message);
      return error.response;
    }
  };

  return (
    <>
      <div className="container-login-screen">
        <div className="leftside"></div>
        <div className="container-login">
          <div className="title-login">Login</div>
          <div className="content-login">
            <form onSubmit={submit}>
              <div className="user-details-login">
                <div className="input-box-login">
                  <span>Email:</span>
                  <input
                    type="email"
                    value={email}
                    placeholder="Email@gmail.com"
                    onChange={({ target }) => setEmail(target.value)}
                  />
                </div>
              </div>
              <div className="user-details-login">
                <div className="input-box-login">
                  <span>Password</span>
                  <input
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={({ target }) => setPassword(target.value)}
                  />
                </div>

                <div class="button-login">
                  <input type="submit" value="Login" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
