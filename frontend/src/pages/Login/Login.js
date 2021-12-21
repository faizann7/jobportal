import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Login.scss";
import { ReactComponent as LoginPhoto } from "./log.svg";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("applicant");

  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState([]);

  const submit = async (e) => {
    e.preventDefault();
    const API_URL = `http://localhost:5000/api/${userType}/login`;
    const user = { email, password };
    try {
      let response = await axios({
        method: "post",
        url: API_URL,
        data: user,
      });
      console.log(response.data);
      setUserDetails(response.data);
      //console.log(response.data.user._id);
      //console.log(response.data.user);
      //console.log("user: ",response.data);
      //console.log("token",response.data.token);
      if (response.status === 200) {
        console.log("USER LOGGED IN");
        localStorage.setItem("userId", response.data.user._id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("userType", response.data.userType);
        navigate("/about");
      }
    } catch (error) {
      console.log(error.response);
      if (error.response) {
        alert(error.response.data.message);
      }
      return error.response;
    }
  };

  return (
    <>
      <div className="container-login">
        <div className="container-leftside">
          <LoginPhoto className="jobhunt" />
        </div>
        <div className="container-rightside">
          {" "}
          <div className="content-login">
            <h3>Login</h3>
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
                <div className="radiobtn">
                  <label>Applicant</label>
                  <input
                    type="radio"
                    checked={userType === "applicant"}
                    value="applicant"
                    onChange={(e) => setUserType(e.target.value)}
                  />
                  <label>Recruiter</label>
                  <input
                    type="radio"
                    checked={userType === "recruiter"}
                    value="recruiter"
                    onChange={(e) => setUserType(e.target.value)}
                  />
                </div>
                <div class="button-login">
                  <input type="submit" value="Login" />
                </div>

                <p>
                  Don't have an account? <Link to="/register"> Sign Up! </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* <div className="container-login-screen">
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
                <div className="radiobtn">
                  <label>Applicant</label>
                  <input
                    type="radio"
                    checked={userType === "applicant"}
                    value="applicant"
                    onChange={(e) => setUserType(e.target.value)}
                  />
                  <label>Recruiter</label>
                  <input
                    type="radio"
                    checked={userType === "recruiter"}
                    value="recruiter"
                    onChange={(e) => setUserType(e.target.value)}
                  />
                </div>
                <div class="button-login">
                  <input type="submit" value="Login" />
                </div>

                <p>
                  Don't have an account? <Link to="/register"> Sign Up! </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Login;
